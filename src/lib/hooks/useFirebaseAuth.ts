import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  AuthError,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

interface AuthResult {
  success: boolean;
  message: string;
}

export function useFirebaseAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized] = useState(!!auth && !!db);

  // Vérification que Firebase est disponible
  const checkFirebaseInit = (): boolean => {
    if (!auth || !db) {
      console.error('❌ Firebase Auth ou Firestore non initialisé');
      return false;
    }
    return true;
  };

  // ✅ Inscription
  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);

    // Vérification préalable
    if (!checkFirebaseInit()) {
      setIsLoading(false);
      return { 
        success: false, 
        message: 'Service d\'authentification non disponible. Vérifiez votre configuration.' 
      };
    }

    try {
      // ✅ auth est maintenant garanti d'exister
      const userCredential = await createUserWithEmailAndPassword(auth!, email, password);
      const user = userCredential.user;

      // Mettre à jour le displayName
      await updateProfile(user, { displayName: username });

      // ✅ db est maintenant garanti d'exister
      await setDoc(doc(db!, 'users', user.uid), {
        uid: user.uid,
        username,
        email,
        profile: '',
        createdAt: new Date(),
      });

      setIsLoading(false);
      return { success: true, message: 'Compte créé avec succès !' };
    } catch (err) {
      const message = getFirebaseErrorMessage(err as AuthError);
      setError(message);
      setIsLoading(false);
      return { success: false, message };
    }
  };

  // ✅ Connexion
  const login = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);

    if (!checkFirebaseInit()) {
      setIsLoading(false);
      return { 
        success: false, 
        message: 'Service d\'authentification non disponible.' 
      };
    }

    try {
      await signInWithEmailAndPassword(auth!, email, password);
      setIsLoading(false);
      return { success: true, message: 'Connexion réussie !' };
    } catch (err) {
      const message = getFirebaseErrorMessage(err as AuthError);
      setError(message);
      setIsLoading(false);
      return { success: false, message };
    }
  };

  // ✅ Déconnexion
  const logout = async (): Promise<AuthResult> => {
    setIsLoading(true);

    if (!checkFirebaseInit()) {
      setIsLoading(false);
      return { 
        success: false, 
        message: 'Service d\'authentification non disponible.' 
      };
    }

    try {
      await signOut(auth!);
      localStorage.removeItem('tokenadmin');
      setIsLoading(false);
      return { success: true, message: 'Déconnexion réussie !' };
    } catch (err) {
      const message = getFirebaseErrorMessage(err as AuthError);
      setError(message);
      setIsLoading(false);
      return { success: false, message };
    }
  };

  // ✅ Réinitialisation du mot de passe
  const resetPassword = async (email: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);

    if (!checkFirebaseInit()) {
      setIsLoading(false);
      return { 
        success: false, 
        message: 'Service d\'authentification non disponible.' 
      };
    }

    try {
      await sendPasswordResetEmail(auth!, email);
      setIsLoading(false);
      return {
        success: true,
        message: 'Un email de réinitialisation a été envoyé !',
      };
    } catch (err) {
      const message = getFirebaseErrorMessage(err as AuthError);
      setError(message);
      setIsLoading(false);
      return { success: false, message };
    }
  };

  return { 
    register, 
    login, 
    logout, 
    resetPassword, 
    isLoading, 
    error,
    isInitialized 
  };
}

// 🔴 Traduction des erreurs Firebase (inchangée)
function getFirebaseErrorMessage(error: AuthError): string {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Cet email est déjà utilisé.';
    case 'auth/invalid-email':
      return 'Adresse email invalide.';
    case 'auth/weak-password':
      return 'Le mot de passe est trop faible (minimum 6 caractères).';
    case 'auth/user-not-found':
      return 'Aucun compte trouvé avec cet email.';
    case 'auth/wrong-password':
      return 'Mot de passe incorrect.';
    case 'auth/invalid-credential':
      return 'Email ou mot de passe incorrect.';
    case 'auth/too-many-requests':
      return 'Trop de tentatives. Veuillez réessayer plus tard.';
    case 'auth/network-request-failed':
      return 'Erreur réseau. Vérifiez votre connexion internet.';
    default:
      return error.message || 'Une erreur est survenue.';
  }
}