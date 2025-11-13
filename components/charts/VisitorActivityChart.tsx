
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { customerDataService } from '../../services/customerDataService';

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-dark-card p-2 border border-dark-border rounded-md shadow-lg">
                <p className="text-gray-300">{`Day: ${label}`}</p>
                <p className="text-white">{`Activity: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const VisitorActivityChart: React.FC = () => {
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const updateChartData = () => {
            const allCustomers = customerDataService.getAllCustomerData();
            
            // Generate last 7 days data
            const last7Days = [];
            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                const dateStr = date.toDateString();
                
                // Count customers for this day
                const dayActivity = allCustomers.filter(customer => {
                    const customerDate = new Date(customer.timestamp).toDateString();
                    return customerDate === dateStr;
                }).length;
                
                last7Days.push({
                    name: dayName,
                    visitors: dayActivity
                });
            }
            
            setChartData(last7Days);
        };

        updateChartData();
        const interval = setInterval(updateChartData, 10000); // Update every 10 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <AreaChart
                    data={chartData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="visitors" stroke="#4F46E5" fill="url(#colorVisitors)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VisitorActivityChart;
