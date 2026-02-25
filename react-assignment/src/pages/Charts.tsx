import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const Charts = () => {
    const navigate = useNavigate();
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const cachedData = localStorage.getItem('cachedData');
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            // First 10 employees
            const formatted = parsedData.slice(0, 10).map((emp: any) => ({
                name: emp.employee_name?.split(' ')[0] || 'Unknown',
                fullName: emp.employee_name,
                salary: Number(emp.employee_salary) || 0
            }));
            setChartData(formatted);
        }
    }, []);

    const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#475569'];

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
                    <TrendingUp size={32} color="var(--primary)" />
                    Salary Distribution
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>Comparing salaries of the first 10 employees</p>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-8"
                style={{ height: '500px' }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                            interval={0}
                            angle={-45}
                            textAnchor="end"
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                            contentStyle={{
                                background: 'rgba(5, 5, 5, 0.9)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '8px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                            }}
                            itemStyle={{ color: 'var(--primary)', fontWeight: 'bold' }}
                            labelStyle={{ color: 'white', marginBottom: '4px' }}
                            formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Annual Salary']}
                            labelFormatter={(label, payload) => payload[0]?.payload.fullName || label}
                        />
                        <Bar
                            dataKey="salary"
                            radius={[6, 6, 0, 0]}
                            animationDuration={1500}
                        >
                            {chartData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>

            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="glass p-4" style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Average Salary</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        ${(chartData.reduce((acc, curr) => acc + curr.salary, 0) / (chartData.length || 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                </div>
                <div className="glass p-4" style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Highest Paid</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                        ${(Math.max(...chartData.map(d => d.salary), 0)).toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Charts;
