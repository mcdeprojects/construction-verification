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
import type { Const } from "./components/const.interface";
import { getConsts } from "./api/get-const.api";

export const InteractiveMap: React.FC = () => {
  const [lands, setLands] = React.useState<Parc | null>(null);
  const [consts, setConsts] = React.useState<Const | null>(null);
  const { openDialog } = useTerrainContext();

  React.useEffect(() => {
    const loadLands = async () => {
      try {
        const dataParc = await getParc();
        const dataConst = await getConsts();
        setLands(dataParc);
        setConsts(dataConst);
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

  // Función de estilo dinámica basada en las propiedades de cada feature
  const getFeatureStyle = (feature?: Feature) => {
    // Obtener el valor de S25_INM_SUP_TE
    const supTe = feature?.properties?.S25_INM_SUP_TE;

    // Determinar el color: rojo si es 0, null o undefined, verde en caso contrario
    const fillColor = (!supTe || supTe === 0) ? '#ef4444' : '#22c55e'; // red-500 : green-500
    const borderColor = (!supTe || supTe === 0) ? '#dc2626' : '#16a34a'; // red-600 : green-600

    return {
      fillColor: fillColor,
      weight: 2,
      opacity: 1,
      color: borderColor,
      fillOpacity: 0.2,
    };
  };

  const constStyles = {
    fillColor: '#3b82f6', // blue-500
    weight: 2,
    opacity: 1,
    color: '#2563eb', // blue-600
    fillOpacity: 0.3, // Un poco más de opacidad para que se vean bien
  };

  return (
    <>
      {lands && consts ? (
        <>
          <Legends />
          <MapContainer
            center={[-25.5095, -54.6158]}
            zoom={13}
            scrollWheelZoom={true}
            className={`${classes.mapContainer} h-[600px]`}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <GeoJSON
              data={lands}
              style={getFeatureStyle}
              onEachFeature={onEachFeature}
            />

            <GeoJSON
              data={consts}
              style={constStyles}
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