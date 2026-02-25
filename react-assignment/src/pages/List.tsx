import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart3,
    Map as MapIcon,
    LogOut,
    Search,
    ChevronRight,
    RefreshCcw,
    Loader2
} from 'lucide-react';
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
        try {
            const response = await axios.post('https://backend.jotish.in/backend_dev/gettabledata.php', {
                username: 'test',
                password: '123456'
            });
            // The API might return an array or an object with a data field
            const result = Array.isArray(response.data) ? response.data : response.data.data || [];
            setData(result);
            localStorage.setItem('cachedData', JSON.stringify(result));
        } catch (err) {
            setError('Failed to fetch data. Please try again.');
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
        <div className="container" style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Welcome back, testuser</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => navigate('/charts')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                        <BarChart3 size={18} />
                        Analytics
                    </button>
                    <button onClick={() => navigate('/map')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                        <MapIcon size={18} />
                        Map
                    </button>
                    <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f43f5e20', color: 'var(--accent)', border: '1px solid #f43f5e40' }}>
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </header>

            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Search records..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ paddingLeft: '40px' }}
                    />
                </div>
                <button onClick={fetchData} className="glass" style={{ padding: '12px' }}>
                    <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            <div className="glass" style={{ overflow: 'hidden' }}>
                {loading ? (
                    <div style={{ padding: '5rem', textAlign: 'center' }}>
                        <Loader2 size={40} className="animate-spin" style={{ margin: '0 auto 1rem', color: 'var(--primary)' }} />
                        <p>Loading your data...</p>
                    </div>
                ) : error ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--accent)' }}>
                        <p>{error}</p>
                        <button onClick={fetchData} style={{ marginTop: '1rem' }}>Retry</button>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>ID</th>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Name</th>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Position</th>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Salary</th>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>City</th>
                                    <th style={{ padding: '1.25rem 1.5rem' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {filteredData.map((item, index) => (
                                        <motion.tr
                                            key={item.id || index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => navigate(`/details/${item.id || index}`, { state: { item } })}
                                            style={{ borderBottom: '1px solid var(--glass-border)', cursor: 'pointer' }}
                                            className="hover:bg-glass"
                                        >
                                            <td style={{ padding: '1.25rem 1.5rem' }}>{item.id}</td>
                                            <td style={{ padding: '1.25rem 1.5rem', fontWeight: '500' }}>{item.employee_name || 'N/A'}</td>
                                            <td style={{ padding: '1.25rem 1.5rem' }}>{item.employee_position || 'N/A'}</td>
                                            <td style={{ padding: '1.25rem 1.5rem', color: '#10b981' }}>${Number(item.employee_salary).toLocaleString()}</td>
                                            <td style={{ padding: '1.25rem 1.5rem' }}>
                                                <span style={{ padding: '4px 10px', background: 'var(--glass-border)', borderRadius: '20px', fontSize: '0.75rem' }}>
                                                    {item.employee_city || 'Remote'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                                <ChevronRight size={18} color="var(--text-secondary)" />
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                        {filteredData.length === 0 && (
                            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                No records found matching your search.
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        tr:hover {
          background: rgba(255, 255, 255, 0.05);
        }
      `}</style>
        </div>
    );
};

export default List;
