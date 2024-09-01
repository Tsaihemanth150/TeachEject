import React, { useState, useEffect } from 'react';

const StatsPage = () => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoints = [
                    '/api/users/block',
                    '/api/users/contact',
                ];

                const data = await Promise.all(endpoints.map(async (endpoint) => {
                    const response = await fetch(endpoint);
                    const status = response.ok ? 'Working' : 'Not Working';
                    return { endpoint, status };
                }));

                setStats(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data: {error.message}</div>;

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl text-center font-bold mb-4">API Stats</h1>
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Endpoint</th>
                        <th className="px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((stat, index) => (
                        <tr key={stat.endpoint}>
                            <td className="border px-4 py-2">{stat.endpoint}</td>
                            <td className={`border px-4 py-2 ${stat.status === 'Working' ? 'bg-green-200' : 'bg-red-200'}`}>{stat.status}</td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StatsPage;
