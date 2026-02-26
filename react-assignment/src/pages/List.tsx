import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const List = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const { logout } = useAuth();
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('https://backend.jotish.in/backend_dev/gettabledata.php', {
                username: 'test',
                password: '123456'
            });
            const result = Array.isArray(response.data) ? response.data : response.data.data || [];
            setData(result);
        } catch (err) {
            setError('Failed to fetch data. Please check your internet or try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = data.filter(item =>
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="container" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1 style={{ margin: 0 }}>Dashboard</h1>
                    <p style={{ margin: 0, color: '#666' }}>List of all employees</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => navigate('/charts')} style={{ width: 'auto' }}>Charts</button>
                    <button onClick={() => navigate('/map')} style={{ width: 'auto' }}>Map</button>
                    <button onClick={handleLogout} style={{ width: 'auto', backgroundColor: '#dc3545' }}>Logout</button>
                </div>
            </div>

            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Search by name, city, or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ flex: 1, marginBottom: 0 }}
                />
                <button onClick={fetchData} style={{ width: 'auto' }}>Refresh Data</button>
            </div>

            <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
                {loading ? (
                    <div style={{ padding: '50px', textAlign: 'center' }}>
                        <p>Loading data, please wait...</p>
                    </div>
                ) : error ? (
                    <div style={{ padding: '30px', textAlign: 'center' }}>
                        <p className="error-message">{error}</p>
                        <button onClick={fetchData} style={{ width: 'auto' }}>Try Again</button>
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: '#f8f9fa' }}>
                            <tr>
                                <th style={{ padding: '12px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>ID</th>
                                <th style={{ padding: '12px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Name</th>
                                <th style={{ padding: '12px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Position</th>
                                <th style={{ padding: '12px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Salary</th>
                                <th style={{ padding: '12px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>City</th>
                                <th style={{ padding: '12px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={item.id || index} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>{item.id}</td>
                                    <td style={{ padding: '12px' }}>{item.employee_name || 'N/A'}</td>
                                    <td style={{ padding: '12px' }}>{item.employee_position || 'N/A'}</td>
                                    <td style={{ padding: '12px' }}>${item.employee_salary}</td>
                                    <td style={{ padding: '12px' }}>{item.employee_city || 'N/A'}</td>
                                    <td style={{ padding: '12px' }}>
                                        <button
                                            onClick={() => navigate(`/details/${item.id || index}`, { state: { item } })}
                                            style={{ padding: '5px 10px', fontSize: '14px', width: 'auto' }}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredData.length === 0 && (
                                <tr>
                                    <td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: '#666' }}>
                                        No employee records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default List;
