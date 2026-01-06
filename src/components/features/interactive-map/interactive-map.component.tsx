import React from "react";
import { GeoJSON } from 'react-leaflet';
import type { Layer } from 'leaflet';
import type { Feature } from 'geojson'; // Importa el tipo correcto de geojson
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import {
  Legends,
  LocationMarker,
  CenterOnLocationButton,
  type Parc,
  type ParcFeature,
} from "./components";
import classes from "./interactive-map.component.module.css";
import { getParc } from "./api";
import { Fallback } from "@/components/ui/fallback.component";
import { useTerrainContext } from "@/contexts";

export const InteractiveMap: React.FC = () => {
  const [lands, setLands] = React.useState<Parc | null>(null);
  const { openDialog } = useTerrainContext();

  React.useEffect(() => {
    const loadLands = async () => {
      try {
        const data = await getParc();
        setLands(data);
      } catch (error) {
        console.error("Error loading lands.");
      }
    };

    loadLands();
  }, []);

  const onEachFeature = (feature: Feature, layer: Layer) => {
    layer.on({
      click: () => {
        console.log('Datos del terreno seleccionado:', feature.properties);
        console.log('Geometría:', feature.geometry);
        // Abrir el modal con la feature seleccionada
        openDialog(feature as ParcFeature);
      },
      mouseover: (e) => {
        const target = e.target;
        target.setStyle({
          fillOpacity: 0.7,
          weight: 3,
        });
      },
      mouseout: (e) => {
        const target = e.target;
        target.setStyle({
          fillOpacity: 0.2,
          weight: 2,
        });
      },
    });
  };

  const style = {
    fillColor: '#3388ff',
    weight: 2,
    opacity: 1,
    color: '#3388ff',
    fillOpacity: 0.2,
  };

  return (
    <>
      {lands ? (
        <>
          <Legends />
          <MapContainer
            center={[-25.5095, -54.6158]}
            zoom={13}
            scrollWheelZoom={true}
            className={`${classes.mapContainer} h-[500px]`}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <GeoJSON
              data={lands}
              style={style}
              onEachFeature={onEachFeature}
            />

            <LocationMarker />
            <CenterOnLocationButton />
          </MapContainer>
        </>
      ) : (
        <Fallback className="h-[500px]" text="Cargando mapa interactivo..." />
      )}
    </>
  );
};