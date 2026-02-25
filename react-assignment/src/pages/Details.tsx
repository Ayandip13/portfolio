import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Camera,
    MapPin,
    Briefcase,
    DollarSign,
    Mail,
    Smartphone,
    Calendar
} from 'lucide-react';

const Details = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // const { id } = useParams();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Get item from location state or fallback (in a real app, fetch by ID if not in state)
    const item = location.state?.item;

    if (!item) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '10rem' }}>
                <h2>Item not found</h2>
                <button onClick={() => navigate('/list')} style={{ marginTop: '2rem' }}>Go Back</button>
            </div>
        );
    }

    const handleCaptureClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageData = reader.result as string;
                navigate('/photo-result', { state: { image: imageData, itemName: item.employee_name } });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <button
                onClick={() => navigate('/list')}
                style={{ background: 'transparent', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', padding: '0', color: 'var(--text-secondary)' }}
            >
                <ArrowLeft size={18} />
                Back to List
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-8"
            >
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                    <div
                        style={{ width: '120px', height: '120px', background: 'linear-gradient(135deg, var(--primary), var(--accent))', borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold' }}
                    >
                        {item.employee_name?.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{item.employee_name}</h1>
                        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Briefcase size={16} />
                                {item.employee_position}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <MapPin size={16} />
                                {item.employee_city || 'Remote'}
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <div className="glass p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>Salary (Annual)</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981' }}>
                            <DollarSign size={20} />
                            {Number(item.employee_salary).toLocaleString()}
                        </div>
                    </div>
                    <div className="glass p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>Experience</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem', fontWeight: 'bold' }}>
                            <Calendar size={20} />
                            {item.employee_age || 'N/A'} Years
                        </div>
                    </div>
                    <div className="glass p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>Email Address</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
                            <Mail size={18} />
                            {item.employee_name?.toLowerCase().replace(' ', '.')}@company.com
                        </div>
                    </div>
                    <div className="glass p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>Phone</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
                            <Smartphone size={18} />
                            +1 (555) 123-4567
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2.5rem', textAlign: 'center' }}>
                    <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Capture a photo for employee verification</p>
                    <button
                        onClick={handleCaptureClick}
                        style={{ padding: '1rem 2.5rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '12px', margin: '0 auto' }}
                    >
                        <Camera size={24} />
                        Capture Photo
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default Details;
