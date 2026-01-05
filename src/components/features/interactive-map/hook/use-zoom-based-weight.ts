import React from "react";
import { useMap } from "react-leaflet";

export interface ZoomWeightConfig {
  minWeight: number;
  maxWeight: number;
  minZoom: number;
  maxZoom: number;
  scale?: "linear" | "exponential";
  exponent?: number;
}

const DEFAULT_CONFIG: ZoomWeightConfig = {
  minWeight: 1,
  maxWeight: 4,
  minZoom: 11,
  maxZoom: 18,
  scale: "exponential",
  exponent: 1.8,
};

export const useZoomBasedWeight = (config: Partial<ZoomWeightConfig> = {}) => {
  const map = useMap();
  const fullConfig = { ...DEFAULT_CONFIG, ...config };

  const [currentWeight, setCurrentWeight] = React.useState<number>(() =>
    calculateWeight(map.getZoom(), fullConfig)
  );

  React.useEffect(() => {
    const updateWeight = () => {
      const zoom = map.getZoom();
      const weight = calculateWeight(zoom, fullConfig);
      setCurrentWeight(weight);
    };

    // Actualizar inmediatamente
    updateWeight();

    // Escuchar cambios de zoom
    map.on("zoomend", updateWeight);

    return () => {
      map.off("zoomend", updateWeight);
    };
  }, [
    map,
    fullConfig.minWeight,
    fullConfig.maxWeight,
    fullConfig.minZoom,
    fullConfig.maxZoom,
    fullConfig.scale,
    fullConfig.exponent,
  ]);

  return currentWeight;
};

function calculateWeight(zoom: number, config: ZoomWeightConfig): number {
  const {
    minWeight,
    maxWeight,
    minZoom,
    maxZoom,
    scale,
    exponent = 1.8,
  } = config;

  // Clamp zoom entre minZoom y maxZoom
  const clampedZoom = Math.max(minZoom, Math.min(maxZoom, zoom));

  if (scale === "linear") {
    // Interpolación lineal
    const ratio = (clampedZoom - minZoom) / (maxZoom - minZoom);
    return minWeight + (maxWeight - minWeight) * ratio;
  } else {
    // Interpolación exponencial (más natural para mapas)
    const ratio = (clampedZoom - minZoom) / (maxZoom - minZoom);
    const exponentialRatio = Math.pow(ratio, exponent);
    return minWeight + (maxWeight - minWeight) * exponentialRatio;
  }
}
