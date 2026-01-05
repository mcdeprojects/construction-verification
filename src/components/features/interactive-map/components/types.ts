interface GeoJsonProperties {
    TIPO: string;
    NOMBRE: string;
    PAVIMENTO: string;
    BARRIO_NOM: string;
    CODIGO_CAL: string;
    DISTANCIA: number;
}

export interface GeoJsonFeature {
    type: 'Feature';
    properties: GeoJsonProperties;
    geometry: {
        type: 'MultiLineString';
        coordinates: number[][][];
    };
}

export interface GeoJsonData {
    type: 'FeatureCollection';
    features: GeoJsonFeature[];
}