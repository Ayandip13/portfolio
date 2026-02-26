import { useNavigate } from 'react-router-dom';
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
import { useEffect, useState } from 'react';

const Charts = () => {
    const navigate = useNavigate();
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const cachedData = localStorage.getItem('cachedData');
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            const formatted = parsedData.slice(0, 10).map((emp: any) => ({
                name: emp.employee_name?.split(' ')[0] || 'Unknown',
                fullName: emp.employee_name,
                salary: Number(emp.employee_salary) || 0
            }));
            setChartData(formatted);
        }
    }, []);

    const COLORS = ['#007bff', '#6610f2', '#6f42c1', '#e83e8c', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8'];

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
                <h1 style={{ margin: 0 }}>Salary Distribution</h1>
                <p style={{ color: '#666' }}>Comparing salaries of the first 10 employees</p>
            </div>

            <div className="card" style={{ height: '400px', marginBottom: '20px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: '#666', fontSize: 12 }}
                            interval={0}
                            angle={-45}
                            textAnchor="end"
                        />
                        <YAxis
                            tick={{ fill: '#666', fontSize: 12 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                background: '#fff',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                            formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Salary']}
                        />
                        <Bar dataKey="salary">
                            {chartData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#888' }}>Average Salary</span>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
                        ${(chartData.reduce((acc, curr) => acc + curr.salary, 0) / (chartData.length || 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#888' }}>Highest Salary</span>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                        ${(Math.max(...chartData.map(d => d.salary), 0)).toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Charts;
