/**
 * Export all FLAMES data from Firebase Firestore to CSV
 * 
 * Usage: node exportFlamesData.js
 * 
 * This script will:
 * 1. Connect to Firebase using your credentials
 * 2. Fetch all documents from 'flames_shares' collection
 * 3. Convert to CSV format
 * 4. Save to 'flames_data.csv' in the current directory
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Timestamp } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Firebase configuration - load from .env.local
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || '',
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.VITE_FIREBASE_APP_ID || '',
};

// Check if all required env vars are set
const requiredEnvVars = Object.keys(firebaseConfig);
const missingVars = requiredEnvVars.filter(key => !firebaseConfig[key]);

if (missingVars.length > 0) {
  console.error('❌ Missing environment variables:');
  missingVars.forEach(varName => {
    console.error(`   - ${varName}`);
  });
  console.error('\n📝 Make sure .env.local file exists with all Firebase config variables');
  process.exit(1);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Convert Firestore Timestamp to readable date string
 */
function formatDate(timestamp) {
  if (!timestamp) return '';
  if (timestamp instanceof Timestamp) {
    return new Date(timestamp.toMillis()).toISOString();
  }
  return timestamp.toString();
}

/**
 * Escape CSV special characters
 */
function escapeCSV(value) {
  if (value === null || value === undefined) return '';
  const stringValue = value.toString();
  // If contains comma, newline, or quote, wrap in quotes and escape quotes
  if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

/**
 * Convert array of objects to CSV string
 */
function convertToCSV(data) {
  if (!data || data.length === 0) {
    return '';
  }

  // Get all unique keys from all objects
  const headers = new Set();
  data.forEach(obj => {
    Object.keys(obj).forEach(key => headers.add(key));
  });

  // Define column order (most important first)
  const columnOrder = [
    'short_id',
    'name1',
    'name2',
    'result',
    'quote',
    'view_count',
    'created_at',
    'id'
  ];

  // Sort headers according to columnOrder, then add remaining
  const sortedHeaders = columnOrder.filter(h => headers.has(h));
  const remainingHeaders = Array.from(headers).filter(h => !columnOrder.includes(h));
  const finalHeaders = [...sortedHeaders, ...remainingHeaders];

  // Create CSV header row
  const headerRow = finalHeaders.map(h => escapeCSV(h)).join(',');

  // Create CSV data rows
  const dataRows = data.map(obj => {
    return finalHeaders.map(header => {
      const value = obj[header];
      return escapeCSV(value);
    }).join(',');
  });

  return [headerRow, ...dataRows].join('\n');
}

/**
 * Main function to fetch and export data
 */
async function exportData() {
  try {
    console.log('🔄 Connecting to Firebase...');
    
    // Get all documents from flames_shares collection
    console.log('📊 Fetching data from "flames_shares" collection...');
    const querySnapshot = await getDocs(collection(db, 'flames_shares'));
    
    if (querySnapshot.empty) {
      console.log('ℹ️  No data found in flames_shares collection');
      return;
    }

    // Convert documents to array with formatted data
    const data = querySnapshot.docs.map(doc => {
      const docData = doc.data();
      return {
        id: doc.id,
        short_id: docData.short_id || '',
        name1: docData.name1 || '',
        name2: docData.name2 || '',
        result: docData.result || '',
        quote: docData.quote || '',
        view_count: docData.view_count || 0,
        created_at: formatDate(docData.created_at)
      };
    });

    console.log(`✅ Fetched ${data.length} record(s)`);

    // Convert to CSV
    console.log('📝 Converting to CSV format...');
    const csv = convertToCSV(data);

    // Save to file
    const outputPath = path.join(__dirname, 'flames_data.csv');
    fs.writeFileSync(outputPath, csv, 'utf-8');

    console.log(`✨ CSV file created successfully!`);
    console.log(`📁 Location: ${outputPath}`);
    console.log(`📊 Total records: ${data.length}`);
    console.log('\n📋 CSV Columns:');
    console.log('   - short_id (share URL ID)');
    console.log('   - name1 (first name)');
    console.log('   - name2 (second name)');
    console.log('   - result (FLAMES result)');
    console.log('   - quote (dynamic quote)');
    console.log('   - view_count (times link was viewed)');
    console.log('   - created_at (when result was created)');
    console.log('   - id (Firestore document ID)');

    // Show sample data
    if (data.length > 0) {
      console.log('\n📌 Sample Record:');
      const sample = data[0];
      console.log(`   Name Pair: ${sample.name1} & ${sample.name2}`);
      console.log(`   Result: ${sample.result}`);
      console.log(`   Views: ${sample.view_count}`);
      console.log(`   Created: ${sample.created_at}`);
    }

  } catch (error) {
    console.error('❌ Error exporting data:');
    console.error(error.message);
    
    if (error.message.includes('credentials')) {
      console.error('\n💡 Tip: Check your .env.local file and make sure all Firebase config variables are set correctly');
    }
    
    process.exit(1);
  }
}

// Run the export
exportData();
