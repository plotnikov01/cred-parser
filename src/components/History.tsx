import React from 'react';
import { HistoryEntry } from '../types/history';
import { Clock, Trash2, X } from 'lucide-react';

interface HistoryProps {
    entries: HistoryEntry[];
    onSelectEntry: (entry: HistoryEntry) => void;
    onClearHistory: () => void;
    onDeleteEntry: (id: string) => void;
}

export const History: React.FC<HistoryProps> = ({
                                                    entries,
                                                    onSelectEntry,
                                                    onClearHistory,
                                                    onDeleteEntry,
                                                }) => {
    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString();
    };

    if (entries.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-gray-500 text-center py-4">No history available</div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    History
                </h2>
                <button
                    onClick={onClearHistory}
                    className="text-red-500 hover:text-red-600 p-1 rounded transition-colors flex items-center gap-1"
                    title="Clear history"
                >
                    <Trash2 className="w-4 h-4" />
                    Clear
                </button>
            </div>
            <div className="divide-y divide-gray-100 max-h-[calc(100vh-200px)] overflow-y-auto">
                {entries.map((entry) => (
                    <div key={entry.id} className="group relative">
                        <button
                            onClick={() => onSelectEntry(entry)}
                            className="w-full text-left p-4 hover:bg-gray-50 transition-colors block"
                        >
                            <div className="text-sm text-gray-500 mb-1">
                                {formatTime(entry.timestamp)}
                            </div>
                            <div className="text-gray-800 line-clamp-2 text-sm font-mono">
                                {entry.input}
                            </div>
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteEntry(entry.id);
                            }}
                            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete entry"
                        >
                            <X className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};