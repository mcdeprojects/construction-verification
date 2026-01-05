import { Alert } from "./alert.component";

interface StreetSelectionStatusProps {
    streetCode?: string;
}

export const StreetSelectionStatus: React.FC<StreetSelectionStatusProps> = ({ streetCode }) => {
    if (streetCode) {
        return (
            <Alert type="success" className="mb-2">
                Calle seleccionada: <strong>Código {streetCode}</strong>
            </Alert>
        );
    }
    
    return (
        <Alert type="warning" className="mb-2">
            Por favor, seleccioná una calle <strong>naranja</strong> en el mapa.
        </Alert>
    );
};