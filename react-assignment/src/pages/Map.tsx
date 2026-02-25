import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowLeft, MapPin } from 'lucide-react';
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
                // If city not in map, generate random offset around New York for demo variety
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
        <div className="container">
            <button
                onClick={() => navigate('/list')}
                style={{ background: 'transparent', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', padding: '0', color: 'var(--text-secondary)' }}
            >
                <ArrowLeft size={18} />
                Back to Dashboard
            </button>

            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <MapPin size={32} color="var(--primary)" />
                    Employee Locations
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>Global distribution of our team</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass"
                style={{ height: '600px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}
            >
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
                            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                            url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        } as any)}
                    />
                    {markers.map((marker, idx) => (
                        <Marker key={`${marker.id}-${idx}`} position={marker.coords as any}>
                            <Popup>
                                <div style={{ padding: '8px', minWidth: '150px' }}>
                                    <h3 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#1e1b4b' }}>{marker.name}</h3>
                                    <p style={{ margin: '0 0 4px', fontSize: '0.8rem', color: '#475569' }}>{marker.position}</p>
                                    <p style={{ margin: '0', fontSize: '0.8rem', fontWeight: 'bold' }}>📍 {marker.city}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </motion.div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div className="glass p-3 px-6" style={{ fontSize: '0.9rem' }}>
                    🌍 Total Regions: <strong>{new Set(markers.map(m => m.city)).size}</strong>
                </div>
                <div className="glass p-3 px-6" style={{ fontSize: '0.9rem' }}>
                    👥 Total Employees: <strong>{markers.length}</strong>
                </div>
            </div>
        </div>
    );
};

export default MapPage;
