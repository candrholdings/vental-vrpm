import React from 'react';
import { demoStartups } from '../data/demoData';
import { Startup } from '../types/incubator';

const Startups: React.FC = () => {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Startups</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border rounded-lg'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Industry</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Phase</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Team Size</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {demoStartups.map((startup: Startup) => (
              <tr key={startup.id}>
                <td className='px-6 py-4 whitespace-nowrap'>{startup.name}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{startup.industry}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{startup.phase}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      startup.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : startup.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {startup.status}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>{startup.team.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Startups;
