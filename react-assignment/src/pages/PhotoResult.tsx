import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, CheckCircle } from 'lucide-react';

const PhotoResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const image = location.state?.image;
    const itemName = location.state?.itemName;

    if (!image) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '10rem' }}>
                <h2>No photo captured</h2>
                <button onClick={() => navigate('/list')} style={{ marginTop: '2rem' }}>Back to List</button>
            </div>
        );
    }

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = image;
        link.download = `photo_${itemName || 'capture'}.png`;
        link.click();
    };

    return (
        <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
            <button
                onClick={() => navigate(-1)}
                style={{ background: 'transparent', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', padding: '0', color: 'var(--text-secondary)' }}
            >
                <ArrowLeft size={18} />
                Retake Photo
            </button>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass p-6"
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#10b981', marginBottom: '1.5rem' }}>
                    <CheckCircle size={20} />
                    <span style={{ fontWeight: '600' }}>Photo Captured Successfully</span>
                </div>

                <div style={{ position: 'relative', marginBottom: '2rem', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                    <img
                        src={image}
                        alt="Captured"
                        style={{ width: '100%', display: 'block' }}
                    />
                </div>

                {itemName && (
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Verified for: <strong style={{ color: 'white' }}>{itemName}</strong>
                    </p>
                )}

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                        onClick={handleDownload}
                        style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Download size={18} />
                        Download
                    </button>
                    <button
                        onClick={() => navigate('/list')}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default PhotoResult;
