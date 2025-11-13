
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { customerDataService } from '../../services/customerDataService';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-dark-card p-2 border border-dark-border rounded-md shadow-lg">
                <p className="text-white">{`${payload[0].name} : ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const TrafficSourceChart: React.FC = () => {
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const updateChartData = () => {
            const allCustomers = customerDataService.getAllCustomerData();
            
            if (allCustomers.length === 0) {
                // Show default message when no data
                setChartData([
                    { name: 'No Data Yet', value: 1, fill: '#6B7280' }
                ]);
                return;
            }

            // Analyze payment status distribution
            const statusCounts = allCustomers.reduce((acc, customer) => {
                const status = customer.paymentStatus;
                acc[status] = (acc[status] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const data = Object.entries(statusCounts).map(([status, count], index) => ({
                name: status.charAt(0).toUpperCase() + status.slice(1),
                value: count,
                fill: COLORS[index % COLORS.length]
            }));

            setChartData(data);
        };

        updateChartData();
        const interval = setInterval(updateChartData, 10000); // Update every 10 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={110}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TrafficSourceChart;
