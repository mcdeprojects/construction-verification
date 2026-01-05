import type { GeoJsonFeature } from "./types"

export const popupContent = (feature: GeoJsonFeature) => {
  return (`
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; padding: 5px;">
      ${
        feature.properties.NOMBRE 
        ? 
        `<h3 style="margin: 0; font-size: 16px; color: #333;"><strong>Calle con nombre</strong></h3>
        <h4 style="margin: 5px 0 0; font-size: 14px; color: #555;">${feature.properties.NOMBRE}</h4>`
        :
        `<h3 style="margin: 0; font-size: 16px; color: #333;"><strong>Calle sin nombre</strong></h3>
        <h4 style="margin: 5px 0 0; font-size: 14px; color: #555;">Código: ${feature.properties.CODIGO_CAL}</h4>
        <div style="margin-top: 8px; padding: 6px; background-color: #e3f2fd; border-radius: 4px; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #1976d2; font-weight: bold;">
            🖱️ Haz clic aquí para reportar
          </p>
        </div>`
      }
    </div>
  `);
};