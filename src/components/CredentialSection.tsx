import React from 'react';
import { CopyButton } from './CopyButton';

interface CredentialSectionProps {
    title: string;
    data: Record<string, any>;
}

export const CredentialSection: React.FC<CredentialSectionProps> = ({ title, data }) => {
    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">{title}</h2>
                <p className="text-gray-500 italic">No data available</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">{title}</h2>
            <div className="space-y-2">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div className="flex-1">
                            <span className="text-gray-600 font-medium">{key}: </span>
                            <span className="text-gray-800 font-mono">
                {Array.isArray(value) ? value.join(', ') : value || 'N/A'}
              </span>
                        </div>
                        {value && <CopyButton text={Array.isArray(value) ? value.join(', ') : String(value)} />}
                    </div>
                ))}
            </div>
        </div>
    );
}