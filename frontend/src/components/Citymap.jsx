import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function CityMap({ onSelectZone }) {
  const zones = [
    { id: "Z1", name: "Zone 1", lat: 12.9716, lng: 77.5946 },
    { id: "Z2", name: "Zone 2", lat: 12.9616, lng: 77.5846 },
    { id: "Z3", name: "Zone 3", lat: 12.9516, lng: 77.5746 }
  ];

  return (
    <MapContainer
      center={[12.9716, 77.5946]}
      zoom={12}
      className="h-full w-full rounded"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {zones.map(zone => (
        <Marker
          key={zone.id}
          position={[zone.lat, zone.lng]}
          eventHandlers={{
            click: () => onSelectZone(zone.id)
          }}
        >
          <Popup>{zone.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}