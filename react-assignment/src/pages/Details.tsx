import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Details = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const item = location.state?.item;

    if (!item) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Employee record not found</h2>
                <button onClick={() => navigate('/list')} style={{ width: 'auto' }}>Go Back to List</button>
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
        <div className="container" style={{ maxWidth: '600px', padding: '20px' }}>
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
                &larr; Back to Employee List
            </button>

            <div className="card">
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        backgroundColor: '#ddd',
                        borderRadius: '50%',
                        margin: '0 auto 15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '40px',
                        fontWeight: 'bold',
                        color: '#666'
                    }}>
                        {item.employee_name?.charAt(0)}
                    </div>
                    <h1 style={{ margin: 0 }}>{item.employee_name}</h1>
                    <p style={{ color: '#666', fontSize: '18px' }}>{item.employee_position}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '14px', color: '#888' }}>Salary</span>
                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>${item.employee_salary}</div>
                    </div>
                    <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '14px', color: '#888' }}>Age</span>
                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.employee_age} Years</div>
                    </div>
                    <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '14px', color: '#888' }}>City</span>
                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.employee_city || 'N/A'}</div>
                    </div>
                    <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '14px', color: '#888' }}>Verification</span>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#28a745' }}>Active</div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', textAlign: 'center' }}>
                    <p style={{ marginBottom: '15px' }}>Take a picture to verify identifying information</p>
                    <button onClick={handleCaptureClick} style={{ width: 'auto' }}>
                        Capture Verification Photo
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
            </div>
        </div>
    );
};

export default Details;
