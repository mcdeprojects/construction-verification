import L from 'leaflet';

export const createLocationIcon = () => {
    return L.divIcon({
        html: `<div style="
      width: 20px;
      height: 20px;
      background-color: #3b82f6;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      position: relative;
    "></div>`,
        className: 'custom-location-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    });
};