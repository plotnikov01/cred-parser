import React from 'react';
import { SSHCredentials } from '../types/credentials';
import { CopyButton } from './CopyButton';

interface SSHCredentialSectionProps {
    data: SSHCredentials;
}

export const SSHCredentialSection: React.FC<SSHCredentialSectionProps> = ({ data }) => {
    const sshConnectionString = `ssh ${data.sshuser}@${data.ip} -p ${data.sshport}`;
    const sshPassword = data.sshpassword;

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">SSH Credentials</h2>
            <div className="space-y-2">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key}
                         className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div className="flex-1">
                            <span className="text-gray-600 font-medium">{key}: </span>
                            <span className="text-gray-800 font-mono">{value || 'N/A'}</span>
                        </div>
                        <CopyButton text={String(value)}/>
                    </div>
                ))}
                <div className="flex items-center justify-between py-2 mt-4 bg-black rounded-lg px-3">
                    <div className="flex-1">
                        <span className="text-green-500 font-mono">{sshConnectionString}</span>
                    </div>
                    <CopyButton text={sshConnectionString}/>
                </div>
                <div className="flex items-center justify-between py-2 mt-4 bg-black rounded-lg px-3">
                    <div className="flex-1">
                        <span className="text-green-500 font-mono">{sshPassword}</span>
                    </div>
                    <CopyButton text={sshPassword}/>
                </div>
            </div>
        </div>
    );
}