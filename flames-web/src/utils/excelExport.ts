import type { FlamesResult } from "./flames";

export interface FlamesRecord {
    id: string;
    date: string;
    name1: string;
    name2: string;
    result: FlamesResult;
}

export const exportToCSV = async (records: FlamesRecord[]) => {
    // CSV export functionality
    // All logging now handled by Firebase Firestore
    const latestRecord = records[records.length - 1];

    if (!latestRecord) return;

    // Record is automatically saved to Firebase via flames.ts
    console.log('Record saved to Firebase Firestore');
};
