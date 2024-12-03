export interface HistoryEntry {
    id: string;
    input: string;
    parsedData: any;
    timestamp: number;
}

export interface HistoryState {
    entries: HistoryEntry[];
}