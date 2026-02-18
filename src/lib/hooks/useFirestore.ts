import { useState } from 'react';
import { 
  collection, 
  addDoc, 
  query,
  where,
  getDocs,
  DocumentData,
  Firestore
} from 'firebase/firestore';
import { db } from '../firebase/config';

export function useFirestore(collectionName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized] = useState(!!db);

  // Vérification que Firestore est disponible
  const checkFirestoreInit = (): Firestore | null => {
    if (!db) {
      const message = '❌ Firestore non initialisé. Vérifiez votre configuration Firebase.';
      console.error(message);
      setError(message);
      return null;
    }
    return db;
  };


  
  // Ajouter un document
  const addDocument = async (data: DocumentData) => {
    setLoading(true);
    setError(null);

    // Vérification préalable
    const firestore = checkFirestoreInit();
    if (!firestore) {
      setLoading(false);
      return null;
    }

    try {
      const docRef = await addDoc(collection(firestore, collectionName), {
        ...data,
        createdAt: new Date()
      });
      setLoading(false);
      return docRef;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setLoading(false);
      return null;
    }
  };

  // Récupérer des documents par champ
  const getDocumentsByField = async <T>(field: string, value: T) => {
    setLoading(true);
    setError(null);

    // Vérification préalable
    const firestore = checkFirestoreInit();
    if (!firestore) {
      setLoading(false);
      return [];
    }

    try {
      const collectionRef = collection(firestore, collectionName);
      const q = query(collectionRef, where(field, '==', value));
      const querySnapshot = await getDocs(q);
      
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as (DocumentData & { id: string })[];
      
      setLoading(false);
      return documents;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setLoading(false);
      return [];
    }
  };

  // Fonction utilitaire pour vérifier l'état
  const checkConnection = (): boolean => {
    return !!db;
  };

  return { 
    addDocument, 
    getDocumentsByField, 
    loading, 
    error,
    isInitialized,
    checkConnection 
  };
}