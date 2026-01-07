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
import { getNotifiedSet } from "./services/notification-service";

export const InteractiveMap: React.FC = () => {
  const [lands, setLands] = React.useState<Parc | null>(null);
  const [consts, setConsts] = React.useState<Const | null>(null);
  const [notifiedSet, setNotifiedSet] = React.useState<Set<string>>(new Set());
  const { openDialog } = useTerrainContext();

  React.useEffect(() => {
    loadLands();
  }, []);


  const loadLands = async () => {
    try {
      const parc = await getParc();
      setLands(parc);

      const dataConst = await getConsts();
      setConsts(dataConst);

      const notified = await getNotifiedSet();
      setNotifiedSet(notified);

    } catch (error) {
      console.error("Error loading data.");
    }
  };

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

  const getFeatureStyle = (feature?: Feature) => {
    const ccatastral = feature?.properties?.ccatastral;
    const supTe = feature?.properties?.S25_INM_SUP_TE;

    const hasConstruction = supTe && supTe >= 1;
    const isNotified = notifiedSet.has(ccatastral);

    // ROJO: tiene construcción Y NO notificado
    // VERDE: cualquier otro caso
    const needsNotification = hasConstruction && !isNotified;

    return {
      fillColor: needsNotification ? '#ef4444' : '#22c55e',
      color: needsNotification ? '#dc2626' : '#16a34a',
      weight: 2,
      opacity: 1,
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
              key={notifiedSet.size}
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