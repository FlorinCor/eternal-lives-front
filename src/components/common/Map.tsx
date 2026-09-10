import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ExternalLink, Navigation } from 'lucide-react';

// Custom Elegant Gold/Charcoal Leaflet Icon
const customIcon = L.divIcon({
  className: 'custom-leaflet-marker',
  html: `
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: #0f1f19;
      border: 2px solid #c5a03e;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6);
      cursor: pointer;
    ">
      <div style="
        width: 10px;
        height: 10px;
        background: #c5a03e;
        border-radius: 50%;
        transform: rotate(45deg);
      "></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Component to handle recentering if coordinates change
const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

interface MapProps {
  latitude: number;
  longitude: number;
  name: string;
  locationName: string;
  address?: string;
  zoom?: number;
  className?: string;
}

export const Map: React.FC<MapProps> = ({
  latitude,
  longitude,
  name,
  locationName,
  address,
  zoom = 13,
  className = 'h-72 w-full rounded-lg',
}) => {
  const position: [number, number] = [latitude, longitude];
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const osmUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`;

  return (
    <div className={`relative overflow-hidden border border-forest-800/80 bg-charcoal-900 shadow-xl ${className}`}>
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noreferrer">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <MapUpdater center={position} zoom={zoom} />
        <Marker position={position} icon={customIcon}>
          <Popup className="custom-leaflet-popup">
            <div className="p-1 min-w-[200px] text-charcoal-900">
              <h4 className="font-serif font-bold text-base text-forest-900 mb-0.5">{name}</h4>
              <p className="text-xs text-charcoal-700 font-medium">{locationName}</p>
              {address && <p className="text-xs text-charcoal-500 mt-1 italic">{address}</p>}
              <div className="mt-3 pt-2 border-t border-charcoal-200 flex items-center justify-between gap-2 text-xs">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-forest-700 hover:text-forest-900 font-semibold"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Directions
                </a>
                <a
                  href={osmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-charcoal-500 hover:text-charcoal-700"
                >
                  <ExternalLink className="w-3 h-3" />
                  OSM
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
