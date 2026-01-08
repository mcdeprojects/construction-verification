import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.migration
dotenv.config({ path: '.env.migration' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Supabase client with SERVICE_ROLE_KEY
const supabase = createClient(
  process.env.VITE_PUBLIC_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

// Function to convert GeoJSON geometry to WKT format for PostGIS
function geometryToWKT(geometry) {
  if (geometry.type === 'MultiPolygon') {
    const polygons = geometry.coordinates.map(polygon => {
      const rings = polygon.map(ring => {
        const points = ring.map(coord => `${coord[0]} ${coord[1]}`).join(', ');
        return `(${points})`;
      }).join(', ');
      return `(${rings})`;
    }).join(', ');
    return `MULTIPOLYGON(${polygons})`;
  }
  return null;
}

async function migrateData() {
  console.log('🚀 Starting migration to Supabase...\n');

  try {
    // Load GeoJSON data
    const geoJsonPath = join(__dirname, '../src/data/map/z1_parc_short.json');
    const geoJsonData = JSON.parse(readFileSync(geoJsonPath, 'utf-8'));
    
    console.log(`📊 Found ${geoJsonData.features.length} parcels to migrate\n`);

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    // Migrate each feature
    for (let i = 0; i < geoJsonData.features.length; i++) {
      const feature = geoJsonData.features[i];
      const props = feature.properties;
      
      try {
        // Convert geometry to WKT
        const wkt = geometryToWKT(feature.geometry);
        
        // Prepare data for insertion
        const parcelData = {
          fid: props.fid,
          padron: props.padron,
          zona: props.zona,
          mz: props.mz,
          lote: props.lote,
          ccatastral: props.ccatastral,
          mz_agr: props.mz_agr,
          lote_agr: props.lote_agr,
          sup_sig_m2: props.sup_sig_m2,
          sup_legal: props.sup_legal,
          propietario: props.PROPIETARIO,
          geometry: wkt ? `SRID=4326;${wkt}` : null
        };

        // Insert into Supabase
        const { error } = await supabase
          .from('parcelas')
          .insert(parcelData);

        if (error) {
          throw error;
        }

        successCount++;
        
        // Show progress every 100 records
        if ((i + 1) % 100 === 0) {
          console.log(`✅ Migrated ${i + 1}/${geoJsonData.features.length} parcels...`);
        }

      } catch (error) {
        errorCount++;
        errors.push({
          ccatastral: props.ccatastral,
          error: error.message
        });
        console.error(`❌ Error migrating ${props.ccatastral}:`, error.message);
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('📈 Migration Summary:');
    console.log('='.repeat(50));
    console.log(`✅ Successfully migrated: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log('='.repeat(50));

    if (errors.length > 0) {
      console.log('\n⚠️  Errors detail:');
      errors.forEach(err => {
        console.log(`   - ${err.ccatastral}: ${err.error}`);
      });
    }

    console.log('\n✨ Migration completed!');

  } catch (error) {
    console.error('💥 Fatal error during migration:', error);
    process.exit(1);
  }
}

// Run migration
migrateData();