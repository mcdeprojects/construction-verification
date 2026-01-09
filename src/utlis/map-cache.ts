// mapCache.ts
import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

interface MapCacheDB extends DBSchema {
    'parcelas': {
        key: string;
        value: {
            data: any;
            count: number;
            timestamp: number;
            version: string;
        };
    };
}

const DB_NAME = 'map-cache-db';
const STORE_NAME = 'parcelas';
const CACHE_KEY = 'parcelas-data';
const CACHE_VERSION = '1.0';
const CACHE_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 días

class MapCache {
    private dbPromise: Promise<IDBPDatabase<MapCacheDB>>;

    constructor() {
        this.dbPromise = openDB<MapCacheDB>(DB_NAME, 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            },
        });
    }

    async get(): Promise<{ data: any; count: number } | null> {
        try {
            const db = await this.dbPromise;
            const cached = await db.get(STORE_NAME, CACHE_KEY);

            if (!cached) {
                console.log('📭 No hay caché disponible');
                return null;
            }

            const now = Date.now();
            const age = now - cached.timestamp;
            const isExpired = age > CACHE_DURATION_MS;
            const isOldVersion = cached.version !== CACHE_VERSION;

            if (isExpired) {
                console.log('⏰ Caché expirado (más de 30 días)');
                await this.clear();
                return null;
            }

            if (isOldVersion) {
                console.log('🔄 Versión de caché obsoleta');
                await this.clear();
                return null;
            }

            const daysOld = Math.floor(age / (24 * 60 * 60 * 1000));
            console.log(`✅ Caché válido (${daysOld} días de antigüedad)`);

            return {
                data: cached.data,
                count: cached.count,
            };
        } catch (error) {
            console.error('❌ Error al leer caché:', error);
            return null;
        }
    }

    async set(data: any, count: number): Promise<void> {
        try {
            const db = await this.dbPromise;
            await db.put(STORE_NAME, {
                data,
                count,
                timestamp: Date.now(),
                version: CACHE_VERSION,
            }, CACHE_KEY);

            console.log(`💾 Caché guardado (${count} registros)`);
        } catch (error) {
            console.error('❌ Error al guardar caché:', error);
            throw error;
        }
    }

    async clear(): Promise<void> {
        try {
            const db = await this.dbPromise;
            await db.delete(STORE_NAME, CACHE_KEY);
            console.log('🗑️ Caché eliminado');
        } catch (error) {
            console.error('❌ Error al eliminar caché:', error);
        }
    }
}

export const parcelasCache = new MapCache();