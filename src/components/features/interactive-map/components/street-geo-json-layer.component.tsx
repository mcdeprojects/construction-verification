import L from "leaflet";
import React from "react";
import { useMap } from "react-leaflet";
import { streetColors, getStreetWidth } from "@/styles";
import type {GeoJsonFeature } from "./types";
import { popupContent } from "./popup-content.component";
import { useZoomBasedWeight, type ZoomWeightConfig } from "../hook";
import type { Parc } from "./parc.interface";

interface Props {
  data: Parc;
  onStreetSelect: (codigo: string) => void;
  selectedStreetCode?: string;
  foundStreetCode?: string;
  zoomWeightConfig?: Partial<ZoomWeightConfig>;
}

export const StreetGeoJsonLayer: React.FC<Props> = ({
  data,
  onStreetSelect,
  selectedStreetCode,
  foundStreetCode,
  zoomWeightConfig,
}) => {
  const map = useMap();
  const layerRef = React.useRef<L.GeoJSON | null>(null);
  //const lastFoundStreetRef = React.useRef<string | undefined>(undefined);

  // Obtener el grosor dinámico basado en zoom
  const currentWeight = useZoomBasedWeight(zoomWeightConfig);

  // Función de estilo que usa el weight dinámico
  const getFeatureStyle = (
    feature: GeoJSON.Feature | undefined,
    baseWeight: number
  ) => {
    if (!feature?.properties) {
      return {
        color: streetColors.default,
        weight: baseWeight,
        opacity: 0.8,
      };
    }

    const withName = feature.properties.NOMBRE;
    const isSelected = feature.properties.CODIGO_CAL === selectedStreetCode;
    const isFound = feature.properties.CODIGO_CAL === foundStreetCode;

    const weights = getStreetWidth(baseWeight);

    let color = streetColors.default;
    let weight = weights.default;

    if (isSelected || isFound) {
      color = streetColors.found;
      weight = weights.found;
    } else if (!withName) {
      color = streetColors.withoutName;
      weight = weights.withoutName || weights.default;
    }

    return {
      color: color,
      weight: weight,
      opacity: 0.8,
    };
  };

  // Efecto 1: Crear/actualizar el layer (se ejecuta con cada cambio de peso/selección)
  React.useEffect(() => {
    // Remover layer anterior si existe
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
    }

    // Crear nuevo layer con el peso actual
    const geoJsonLayer = L.geoJSON(data, {
      style: (feature) => getFeatureStyle(feature, currentWeight),
      onEachFeature: (feature, layer) => {
        if (feature.properties) {
          const popup = popupContent(feature as GeoJsonFeature);
          layer.bindPopup(popup);

          // Solo para calles SIN nombre
          if (!feature.properties.NOMBRE) {
            layer.on("click", () => {
              onStreetSelect(feature.properties.CODIGO_CAL);

              setTimeout(() => {
                const formElement = document.querySelector("form");
                if (formElement) {
                  formElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }, 100);

              layer.closePopup();
            });

            layer.on("mouseover", () => {
              map.getContainer().style.cursor = "pointer";
            });
            layer.on("mouseout", () => {
              map.getContainer().style.cursor = "";
            });
          }
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
  }, [
    map,
    data,
    onStreetSelect,
    selectedStreetCode,
    foundStreetCode,
    currentWeight,
  ]);

  return null;
};
