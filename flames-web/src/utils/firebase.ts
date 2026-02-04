import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  updateDoc,
  increment,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Types
export interface FlamesShare {
  id: string;
  short_id: string;
  name1: string;
  name2: string;
  result: string;
  quote: string;
  created_at: Timestamp;
  view_count: number;
}

// Generate a random 6-character short ID
function generateShortId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

// Save a flames result to Firestore
export async function saveFlamesResult(
  name1: string,
  name2: string,
  result: string,
  quote: string
): Promise<FlamesShare | null> {
  try {
    const short_id = generateShortId();
    
    const docRef = await addDoc(collection(db, 'flames_shares'), {
      short_id,
      name1: name1.trim(),
      name2: name2.trim(),
      result,
      quote,
      created_at: serverTimestamp(),
      view_count: 0,
    });

    return {
      id: docRef.id,
      short_id,
      name1,
      name2,
      result,
      quote,
      created_at: Timestamp.now(),
      view_count: 0,
    };
  } catch (error) {
    console.error('Error saving flames result:', error);
    return null;
  }
}

// Fetch a shared result by short ID and increment view count
export async function fetchSharedResult(shortId: string): Promise<FlamesShare | null> {
  try {
    const q = query(
      collection(db, 'flames_shares'),
      where('short_id', '==', shortId)
    );

    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('No result found for short ID:', shortId);
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    // Increment view count
    try {
      await updateDoc(doc.ref, {
        view_count: increment(1),
      });
    } catch (error) {
      console.warn('Could not increment view count:', error);
    }

    return {
      id: doc.id,
      short_id: data.short_id,
      name1: data.name1,
      name2: data.name2,
      result: data.result,
      quote: data.quote,
      created_at: data.created_at || Timestamp.now(),
      view_count: data.view_count + 1 || 1,
    };
  } catch (error) {
    console.error('Error fetching shared result:', error);
    return null;
  }
}

// Get the share URL for a short ID
export function getShareUrl(shortId: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}/share/${shortId}`;
}

// Export Firestore instance for advanced usage
export { db, app };
