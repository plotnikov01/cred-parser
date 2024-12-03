import React, { useState, useEffect } from 'react';
import { parseCredentialString } from '../utils/credentialParser';
import { CredentialSection } from './CredentialSection';
import { SSHCredentialSection } from './SSHCredentialSection';
import { ParsedCredentials } from '../types/credentials';
import { History } from './History';
import { HistoryEntry } from '../types/history';
import { saveToHistory, getHistory, clearHistory, deleteHistoryEntry } from '../utils/historyStorage';

export const CredentialParser: React.FC = () => {
    const [input, setInput] = useState('');
    const [parsedData, setParsedData] = useState<ParsedCredentials | null>(null);
    const [error, setError] = useState('');
    const [history, setHistory] = useState<HistoryEntry[]>([]);

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setParsedData(null);

        if (!input.trim()) {
            setError('Please enter a credential string.');
            return;
        }

        try {
            const result = parseCredentialString(input);
            if (result) {
                setParsedData(result);
                saveToHistory({ input, parsedData: result });
                setHistory(getHistory());
            } else {
                setError('No valid credentials found in the input string.');
            }
        } catch (err) {
            setError('An error occurred while parsing the credential string.');
            console.error('Parsing error:', err);
        }
    };

    const handleHistorySelect = (entry: HistoryEntry) => {
        setInput(entry.input);
        setParsedData(entry.parsedData);
        setError('');
    };

    const handleClearHistory = () => {
        clearHistory();
        setHistory([]);
    };

    const handleDeleteEntry = (id: string) => {
        deleteHistoryEntry(id);
        setHistory(getHistory());
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Credential Parser</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="credentialInput" className="block text-sm font-medium text-gray-700 mb-2">
                                        Credential String
                                    </label>
                                    <textarea
                                        id="credentialInput"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Paste your credential string here..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Parse Credentials
                                </button>
                            </form>
                        </div>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                                <p className="font-medium">Error:</p>
                                <p>{error}</p>
                            </div>
                        )}

                        {parsedData && (
                            <div className="space-y-6">
                                {parsedData.FTP && <CredentialSection title="FTP Credentials" data={parsedData.FTP} />}
                                {parsedData.WPAdmin && <CredentialSection title="WordPress Admin Credentials" data={parsedData.WPAdmin} />}
                                {parsedData.SSH && <SSHCredentialSection data={parsedData.SSH} />}
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <History
                            entries={history}
                            onSelectEntry={handleHistorySelect}
                            onClearHistory={handleClearHistory}
                            onDeleteEntry={handleDeleteEntry}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};