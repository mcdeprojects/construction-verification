import L from "leaflet";
import { useMap } from "react-leaflet";
import type { FeatureProperties, Parc } from "./parc.interface";
import React from "react";

interface TerrenosGeoJsonLayerProps {
  data: Parc;
  onTerrenoSelect: (terreno: FeatureProperties) => void;
  selectedTerreno?: FeatureProperties | null;
}

export const TerrenosGeoJsonLayer: React.FC<TerrenosGeoJsonLayerProps> = ({
  data,
  onTerrenoSelect,
  selectedTerreno,
}) => {
  const map = useMap();
  const layerRef = React.useRef<L.GeoJSON | null>(null);

  // Colores para los diferentes estados de los terrenos
  const terrenoColors = {
    default: '#3388ff',      // Azul para terrenos sin notificar
    notificado: '#22c55e',   // Verde para terrenos notificados
    selected: '#f59e0b',     // Naranja para terreno seleccionado
  };

  // Función de estilo para los polígonos
  const getFeatureStyle = (feature: GeoJSON.Feature | undefined) => {
    if (!feature?.properties) {
      return {
        fillColor: terrenoColors.default,
        fillOpacity: 0.5,
        color: '#2563eb',
        weight: 2,
        opacity: 0.8,
      };
    }

    const isSelected = selectedTerreno?.fid === feature.properties.fid;
    const isNotificado = feature.properties.AC_VERIFICADO === 'SI'; // Ajusta según tu lógica

    let fillColor = terrenoColors.default;
    let fillOpacity = 0.5;

    if (isSelected) {
      fillColor = terrenoColors.selected;
      fillOpacity = 0.7;
    } else if (isNotificado) {
      fillColor = terrenoColors.notificado;
      fillOpacity = 0.6;
    }

    return {
      fillColor: fillColor,
      fillOpacity: fillOpacity,
      color: isSelected ? '#dc2626' : '#1e40af',
      weight: isSelected ? 3 : 2,
      opacity: 0.8,
    };
  };

  // Crear popup con información del terreno
  const createPopupContent = (properties: FeatureProperties): string => {
    return `
      <div style="padding: 8px;">
        <h3 style="margin: 0 0 8px 0; font-weight: bold;">Terreno</h3>
        <p style="margin: 4px 0;"><strong>FID:</strong> ${properties.fid}</p>
        <p style="margin: 4px 0;"><strong>Padrón:</strong> ${properties.padron}</p>
        <p style="margin: 4px 0;"><strong>Zona:</strong> ${properties.zona}</p>
        <p style="margin: 4px 0;"><strong>Lote:</strong> ${properties.lote}</p>
        ${properties.nombre_obj ? `<p style="margin: 4px 0;"><strong>Propietario:</strong> ${properties.nombre_obj}</p>` : ''}
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Click para ver más detalles</p>
      </div>
    `;
  };

  React.useEffect(() => {
    // Remover layer anterior si existe
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
    }

    // Crear nuevo layer
    const geoJsonLayer = L.geoJSON(data, {
      style: (feature) => getFeatureStyle(feature),
      onEachFeature: (feature, layer) => {
        if (feature.properties) {
          const popup = createPopupContent(feature.properties as FeatureProperties);
          layer.bindPopup(popup);

          // Evento click para seleccionar el terreno
          layer.on("click", () => {
            onTerrenoSelect(feature.properties as FeatureProperties);
            layer.closePopup();
          });

          // Efectos hover
          layer.on("mouseover", (e) => {
            const targetLayer = e.target;
            targetLayer.setStyle({
              weight: 3,
              fillOpacity: 0.7,
            });
            map.getContainer().style.cursor = "pointer";
          });

          layer.on("mouseout", (e) => {
            geoJsonLayer.resetStyle(e.target);
            map.getContainer().style.cursor = "";
          });
        }
      },
    });

    geoJsonLayer.addTo(map);
    layerRef.current = geoJsonLayer;

    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };
  }, [map, data, onTerrenoSelect, selectedTerreno]);

  // Centrar en el terreno seleccionado
  React.useEffect(() => {
    if (selectedTerreno) {
      const selectedFeature = data.features.find(
        (feature) => feature.properties.fid === selectedTerreno.fid
      );

      if (selectedFeature && selectedFeature.geometry) {
        const tempLayer = L.geoJSON(selectedFeature);
        const bounds = tempLayer.getBounds();

        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 17,
        });
      }
    }
  }, [selectedTerreno, data, map]);

  return null;
};