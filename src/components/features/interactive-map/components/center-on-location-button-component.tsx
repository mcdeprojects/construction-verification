import React from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { toast } from 'sonner';
import { MapPin } from './map-pin.component';


export const CenterOnLocationButton: React.FC = () => {
    const map = useMap();

    React.useEffect(() => {
        const CenterControl = L.Control.extend({
            options: {
                position: 'topleft'
            },

            onAdd: function () {
                const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

                const button = L.DomUtil.create('a', '', container);
                button.innerHTML = MapPin
                button.href = '#';
                button.title = 'Centrar en mi ubicación';
                button.style.lineHeight = '30px';
                button.style.textAlign = 'center';
                button.style.textDecoration = 'none';
                button.style.color = '#333';
                button.style.width = '30px';
                button.style.height = '30px';
                button.style.display = 'flex';
                button.style.alignItems = 'center';
                button.style.justifyContent = 'center';
                button.style.backgroundColor = 'white';
                button.style.border = 'none';
                button.style.padding = '5px';

                const centerOnLocation = () => {
                    if (!navigator.geolocation) {
                        toast.error('Tu navegador no soporta geolocalización');
                        return;
                    }

                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            const userLocation = new L.LatLng(latitude, longitude);

                            map.setView(userLocation, Math.max(map.getZoom(), 16));

                            toast.success(
                                `Ubicación encontrada.`,
                                { id: 'location-toast' }
                            );
                        },
                        (error) => {
                            console.error('Error getting location:', error);

                            let errorMessage = '';
                            switch (error.code) {
                                case error.PERMISSION_DENIED:
                                    errorMessage = 'La aplicación no puede funcionar sin permisos de ubicación';
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    errorMessage = 'Tu ubicación no está disponible en este momento';
                                    break;
                                case error.TIMEOUT:
                                    errorMessage = 'El tiempo de espera para obtener tu ubicación ha expirado';
                                    break;
                                default:
                                    errorMessage = 'Error desconocido al obtener tu ubicación';
                            }

                            toast.error(errorMessage, { id: 'location-toast' });
                        },
                        {
                            enableHighAccuracy: true,
                            timeout: 10000,
                            maximumAge: 60000
                        }
                    );
                };

                L.DomEvent.on(button, 'click', L.DomEvent.stopPropagation);
                L.DomEvent.on(button, 'click', L.DomEvent.preventDefault);
                L.DomEvent.on(button, 'click', centerOnLocation);

                return container;
            },

            onRemove: function () {

            }
        });


        const centerControl = new CenterControl();
        map.addControl(centerControl);


        return () => {
            map.removeControl(centerControl);
        };
    }, [map]);

    return null;
};