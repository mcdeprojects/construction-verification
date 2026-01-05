import React from 'react';
import type { GeoJsonData } from '../components';

export const useLazyRoadsData = () => {
    const [roadsData, setRoadsData] = React.useState<GeoJsonData | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const loadRoadsData = async () => {
        if (roadsData) return; 

        setIsLoading(true);
        setError(null);

        try {    
            const data = await import('@data/roads-wgs84.json');
            setRoadsData(data as GeoJsonData);
        } catch (err) {
            setError('Error al cargar datos del mapa');
            console.error('Error loading roads data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return { roadsData, isLoading, error, loadRoadsData };
};
