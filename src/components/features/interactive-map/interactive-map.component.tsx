import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import {
  StreetSearcher,
  type GeoJsonData,
  Legends,
  LocationMarker,
  StreetGeoJsonLayer,
  CenterOnLocationButton,
  type Parc,
} from "./components";
import classes from "./interactive-map.component.module.css";
import { getRoads, getParc } from "./api";
import { Fallback } from "@/components/ui/fallback.component";

interface Props {
  onStreetSelect: (codigo: string) => void;
  selectedStreetCode?: string;
  foundStreetCode?: string;
  setFoundStreetCode: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const InteractiveMap: React.FC<Props> = ({
  onStreetSelect,
  selectedStreetCode,
  foundStreetCode,
  setFoundStreetCode,
}) => {
  const [roads, setRoads] = React.useState<Parc | null>(null);

  React.useEffect(() => {
    const loadRoads = async () => {
      try {
        const data = await getParc();
        setRoads(data);
      } catch (error) {
        console.error("Error loading roads.");
      }
    };

    loadRoads();
  }, []);

  const handleStreetFound = (codigo: string, _nombre: string) => {
    setFoundStreetCode(codigo);
  };

  return (
    <>
      {roads ? (
        <>
          {/*<StreetSearcher parcData={roads} onStreetFound={handleStreetFound} />*/}
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
            
            <LocationMarker />
            <CenterOnLocationButton />
            
            <StreetGeoJsonLayer
              data={roads}
              onStreetSelect={onStreetSelect}
              selectedStreetCode={selectedStreetCode}
              foundStreetCode={foundStreetCode}
              zoomWeightConfig={{
                minWeight: 0.5, // Zoom alejado: líneas muy finas
                maxWeight: 7, // Zoom cercano: líneas gruesas
                minZoom: 11, // Desde zoom 11
                maxZoom: 18, // Hasta zoom 18
                scale: "linear", // Crecimiento exponencial (más natural)
                exponent: 1.8, // Controla la curva de crecimiento
              }}
            />
          </MapContainer>
        </>
      ) : (
        <Fallback className="h-[500px]" text="Cargando mapa interactivo..." />
      )}
    </>
  );
};
