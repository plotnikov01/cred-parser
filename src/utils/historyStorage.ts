import { HistoryEntry } from '../types/history';

const STORAGE_KEY = 'credential_parser_history';
const EXPIRATION_TIME = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

export const saveToHistory = (entry: Omit<HistoryEntry, 'id' | 'timestamp'>): void => {
    const history = getHistory();

    // Check if the same input already exists
    const isDuplicate = history.some(existingEntry => existingEntry.input === entry.input);
    if (isDuplicate) return;

    const newEntry: HistoryEntry = {
        ...entry,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
    };

    history.unshift(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const deleteHistoryEntry = (id: string): void => {
    const history = getHistory();
    const updatedHistory = history.filter(entry => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
};

export const getHistory = (): HistoryEntry[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];

        const history: HistoryEntry[] = JSON.parse(stored);
        const now = Date.now();

        // Filter out expired entries
        const validEntries = history.filter(
            entry => now - entry.timestamp < EXPIRATION_TIME
        );

        // If we filtered out any entries, update storage
        if (validEntries.length !== history.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(validEntries));
        }

        return validEntries;
    } catch (error) {
        console.error('Error reading history:', error);
        return [];
    }
};

export const clearHistory = (): void => {
    localStorage.removeItem(STORAGE_KEY);
};