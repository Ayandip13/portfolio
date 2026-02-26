import { useLocation, useNavigate } from 'react-router-dom';

const PhotoResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const image = location.state?.image;
    const itemName = location.state?.itemName;

    if (!image) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
                <h2>No photo found.</h2>
                <button onClick={() => navigate('/list')} style={{ width: 'auto' }}>Go back to list</button>
            </div>
        );
    }

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = image;
        link.download = `verification_${itemName || 'photo'}.png`;
        link.click();
    };

    return (
        <div className="container" style={{ maxWidth: '500px', textAlign: 'center', padding: '20px' }}>
            <button
                onClick={() => navigate(-1)}
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
                &larr; Retake Photo
            </button>

            <div className="card">
                <div style={{ color: '#28a745', fontWeight: 'bold', marginBottom: '15px' }}>
                    Photo Captured Successfully!
                </div>

                <div style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px', borderRadius: '4px' }}>
                    <img
                        src={image}
                        alt="Captured"
                        style={{ width: '100%', borderRadius: '4px' }}
                    />
                </div>

                {itemName && (
                    <p style={{ marginBottom: '20px' }}>
                        Verification for: <strong>{itemName}</strong>
                    </p>
                )}

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button onClick={handleDownload} style={{ width: 'auto', backgroundColor: '#6c757d' }}>
                        Download Photo
                    </button>
                    <button onClick={() => navigate('/list')} style={{ width: 'auto' }}>
                        Back to List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhotoResult;
