import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { LogIn, User, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate small delay for premium feel
        setTimeout(() => {
            if (login(username, password)) {
                navigate('/list');
            } else {
                setError('Invalid username or password');
            }
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="flex items-center justify-center min-vh-100 p-6" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-8 w-100 max-w-sm"
                style={{ width: '500px', padding: '2rem' }}
            >
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold">Welcome Back</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Log in to your account to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div style={{ marginBottom: '1rem' }}>
                        <label className="block text-sm font-medium mb-1" style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
                        <div style={{ position: 'relative' }}>
                            <User
                                size={18}
                                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}
                            />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="testuser"
                                required
                                style={{ paddingLeft: '40px' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label className="block text-sm font-medium mb-1" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock
                                size={18}
                                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={{ paddingLeft: '40px' }}
                            />
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-3 mb-4 rounded-lg flex items-center gap-2"
                            style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <AlertCircle size={18} />
                            <span className="text-sm">{error}</span>
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        className="w-100 py-3"
                        disabled={isLoading}
                        style={{ width: '100%', padding: '0.75rem' }}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm" style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <p>Don't have an account? <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Sign up</span></p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;