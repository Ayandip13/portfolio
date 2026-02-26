import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const cityCoordinates: { [key: string]: [number, number] } = {
    'New York': [40.7128, -74.0060],
    'London': [51.5074, -0.1278],
    'Tokyo': [35.6762, 139.6503],
    'San Francisco': [37.7749, -122.4194],
    'Sydney': [-33.8688, 151.2093],
    'Berlin': [52.5200, 13.4050],
    'Mumbai': [19.0760, 72.8777],
    'Paris': [48.8566, 2.3522],
    'Dubai': [25.2048, 55.2708],
    'Singapore': [1.3521, 103.8198],
};

const MapPage = () => {
    const navigate = useNavigate();
    const [markers, setMarkers] = useState<any[]>([]);

    useEffect(() => {
        const cachedData = localStorage.getItem('cachedData');
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            const locations = parsedData.map((emp: any) => {
                const city = emp.employee_city || 'New York';
                const coords = cityCoordinates[city] || [
                    40.7128 + (Math.random() - 0.5) * 5,
                    -74.0060 + (Math.random() - 0.5) * 5
                ];
                return {
                    id: emp.id,
                    name: emp.employee_name,
                    position: emp.employee_position,
                    city: city,
                    coords: coords
                };
            });
            setMarkers(locations);
        }
    }, []);

    return (
        <div className="container" style={{ padding: '20px' }}>
            <button
                onClick={() => navigate('/list')}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-color)',
                    textAlign: 'left',
                    padding: 0,
                    marginBottom: '20px',
                    width: 'auto',
                    textDecoration: 'underline'
                }}
            >
                &larr; Back to Dashboard
            </button>

            <div style={{ marginBottom: '20px' }}>
                <h1 style={{ margin: 0 }}>Employee Locations</h1>
                <p style={{ color: '#666' }}>Geographic distribution of our staff</p>
            </div>

            <div className="card" style={{ height: '500px', overflow: 'hidden', padding: 0 }}>
                <MapContainer
                    {...({
                        center: [20, 0],
                        zoom: 2,
                        style: { height: '100%', width: '100%' },
                        scrollWheelZoom: true
                    } as any)}
                >
                    <TileLayer
                        {...({
                            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        } as any)}
                    />
                    {markers.map((marker, idx) => (
                        <Marker key={`${marker.id}-${idx}`} position={marker.coords as any}>
                            <Popup>
                                <div style={{ minWidth: '150px' }}>
                                    <h4 style={{ margin: '0 0 5px' }}>{marker.name}</h4>
                                    <p style={{ margin: '0 0 5px', fontSize: '13px' }}>{marker.position}</p>
                                    <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>City: {marker.city}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
                <div className="card" style={{ flex: 1, textAlign: 'center', padding: '15px' }}>
                    <span style={{ fontSize: '14px', color: '#888' }}>Total Regions</span>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{new Set(markers.map(m => m.city)).size}</div>
                </div>
                <div className="card" style={{ flex: 1, textAlign: 'center', padding: '15px' }}>
                    <span style={{ fontSize: '14px', color: '#888' }}>Total Employees</span>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{markers.length}</div>
                </div>
            </div>
        </div>
    );
};

export default MapPage;
