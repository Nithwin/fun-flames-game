import type { FlamesResult } from "./flames";

export interface FlamesRecord {
    id: string;
    date: string;
    name1: string;
    name2: string;
    result: FlamesResult;
}

export const exportToCSV = async (records: FlamesRecord[]) => {
    // Get the latest record (the one just added)
    const latestRecord = records[records.length - 1];

    if (!latestRecord) return;

    try {
        await fetch('http://localhost:3001/api/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(latestRecord),
        });
        console.log('Secretly logged to server');
    } catch (error) {
        console.error('Failed to log secretly:', error);
    }
};
