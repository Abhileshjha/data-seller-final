
import React from 'react';

const BlurredDataSample: React.FC = () => {
    const sampleData = [
        { name: 'A*** Kumar', phone: '98*****123', email: 'a***@g***.com', location: 'Noida Sec 62' },
        { name: 'S*** Sharma', phone: '99*****456', email: 's***@y***.com', location: 'Greater Noida' },
        { name: 'R*** Singh', phone: '97*****789', email: 'r***@h***.com', location: 'Ghaziabad' },
        { name: 'P*** Gupta', phone: '96*****321', email: 'p***@o***.com', location: 'Yamuna Expressway' },
        { name: 'V*** Mishra', phone: '95*****654', email: 'v***@r***.com', location: 'Noida Sec 18' },
        { name: 'M*** Jain', phone: '94*****987', email: 'm***@g***.com', location: 'Indirapuram' },
        { name: 'D*** Yadav', phone: '93*****159', email: 'd***@y***.com', location: 'Greater Noida West' },
        { name: 'K*** Verma', phone: '92*****753', email: 'k***@h***.com', location: 'Noida Extension' },
    ];
    
    return (
        <div className="relative overflow-hidden rounded-lg border border-dark-border bg-dark-card p-6 my-16">
            <h3 className="text-2xl font-bold text-center mb-6 text-white">Data Sample</h3>
            <div className="filter blur-sm select-none">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="text-xs text-gray-300 uppercase bg-gray-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Phone</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleData.map((row, index) => (
                            <tr key={index} className="border-b border-dark-border hover:bg-gray-700/50">
                                <td className="px-6 py-4">{row.name}</td>
                                <td className="px-6 py-4">{row.phone}</td>
                                <td className="px-6 py-4">{row.email}</td>
                                <td className="px-6 py-4">{row.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 flex items-center justify-center p-4">
                 <div className="text-center bg-black/60 p-6 rounded-lg backdrop-blur-sm border border-dark-border">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-brand-blue h-12 w-12 mb-2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <p className="font-semibold text-lg">Purchase to Unlock Full Data</p>
                </div>
            </div>
        </div>
    );
};

export default BlurredDataSample;
