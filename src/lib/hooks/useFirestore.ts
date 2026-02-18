import { useState } from 'react';
import { 
  collection, 
  addDoc, 
  query,
  where,
  getDocs,
  DocumentData 
} from 'firebase/firestore';
import { db } from '../firebase/config';


export function useFirestore(collectionName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ajouter un document
  const addDocument = async (data: DocumentData) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date()
      });
      setLoading(false);
      return docRef;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setLoading(false);
      return null;
    }
  };

  // Récupérer des documents par champ
  const getDocumentsByField = async (field: string, value: any) => {
    setLoading(true);
    try {
      const q = query(collection(db, collectionName), where(field, '==', value));
      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLoading(false);
      return documents;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setLoading(false);
      return [];
    }
  };

  return { addDocument, getDocumentsByField, loading, error };
}