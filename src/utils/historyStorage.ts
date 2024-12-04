import { HistoryEntry } from '../types/history';

const STORAGE_KEY = 'credential_parser_history';

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

        return JSON.parse(stored);
    } catch (error) {
        console.error('Error reading history:', error);
        return [];
    }
};

export const clearHistory = (): void => {
    localStorage.removeItem(STORAGE_KEY);
};