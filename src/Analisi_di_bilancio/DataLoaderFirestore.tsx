import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { signInWithEmailAndPassword, signOut, deleteUser, reauthenticateWithPopup, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot, setDoc, deleteDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { BilancioOb, Dati_Azienda } from "./Bilancio&DatiAzienda.ts";
import { collection, getDocs } from "firebase/firestore";

// Configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDq7S60wTMJYQ6DIViRnXx6xhqKTfPTI_g",
  authDomain: "dataanalisidibilancio.firebaseapp.com",
  projectId: "dataanalisidibilancio",
  storageBucket: "dataanalisidibilancio.firebasestorage.app",
  messagingSenderId: "943860050439",
  appId: "1:943860050439:web:4fd3a8a28f0614fb4818a2"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


//mappa errori
const getFriendlyFirebaseError = (errorCode: string): string => {
  const errors: { [key: string]: string } = {
    "auth/invalid-email": "L'indirizzo email non è valido.",
    "auth/user-disabled": "Questo account è stato disabilitato.",
    "auth/user-not-found": "Utente non trovato. Controlla l'email inserita.",
    "auth/wrong-password": "Password errata. Riprova.",
    "auth/email-already-in-use": "L'email è già in uso da un altro account.",
    "auth/weak-password": "La password è troppo debole. Usa almeno 6 caratteri.",
    "auth/too-many-requests": "Troppi tentativi. Attendi e riprova più tardi.",
    "auth/network-request-failed": "Errore di rete. Verifica la connessione.",
  };

  return errors[errorCode] ||"Controlla le credenziali e riprova!";
};


// login & logout
export async function loginUtente(email: string, password: string): Promise<boolean> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error: any) {
    const errorMessage = getFriendlyFirebaseError(error.code);
    alert(`Errore nel login: ${errorMessage}`);
    return false;
  }
}

export async function logoutUtente() {
  try {
    await signOut(auth);
    alert("Logout effettuato");
  } catch (error: any) {
    const msg = getFriendlyFirebaseError(error.code || "generic");
    alert(`Errore nel logout: ${msg}`);
  }
}


// Registrazione utente
export async function registraUtente(email: string, password: string, keyapi: string): Promise<boolean>  {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "utenti", user.uid), {});
    console.log("Utente registrato!");
    return true;

  } catch (error: any) {
    const errorMessage = getFriendlyFirebaseError(error.code);
    alert(`Errore durante la registrazione: ${errorMessage}`);
    return false;
  }
}

//registra utente che fa login con google
export const CreaDocUt = async (uid: string) => {
  const docRef = doc(db, "utenti", uid);
  const docSnap = await getDoc(docRef);
  await setDoc(docRef, {});
};


//Cancella Account
// Verifica se la password inserita è corretta
export const verifyPasswordBeforeDelete = async (password: string): Promise<boolean> => {
  const user = auth.currentUser;
  if (!user || !user.email) {
    alert("Nessun utente autenticato.");
    return false;
  }
  try {
    const credential = EmailAuthProvider.credential(user.email, password);

    await reauthenticateWithCredential(user, credential); // verifica autenticando.
    return true;
  } catch (error: any) {
    const msg = getFriendlyFirebaseError(error.code || "generic");
    alert(`Password non valida: ${msg}`);
    return false;
  }
};

//email/password
export const deleteEmailPasswordAccount = async () => {
  const user = auth.currentUser;
  if (!user) {
    alert("Nessun utente autenticato.");
    return false;
  }
  try {
    await deleteDoc(doc(db, "utenti", user.uid));// dati utente da Firestore
    await deleteUser(user);// account da Firebase Authentication
    alert("Account eliminato con successo.");
    return true
  } catch (error: any) {
    const msg = getFriendlyFirebaseError(error.code || "generic");
    alert(`Errore durante la cancellazione: ${msg}`);
    return false
  }
};

//account Google
export const deleteGoogleAccount = async () => {
  const user = auth.currentUser;
  if (!user) {
    alert("Nessun utente autenticato.");
    return false;
  }
  try {
    await reauthenticateWithPopup(user, googleProvider); // verifica autenticando
    await deleteDoc(doc(db, "utenti", user.uid));// dati da Firestore
    await deleteUser(user);// account
    alert("Account eliminato con successo.");
    return true
  } catch (error: any) {
    const msg = getFriendlyFirebaseError(error.code || "generic");
    alert(`Errore durante la cancellazione account Google: ${msg}`);
    return false
  }
};

//salva i dati
export async function saveUserDoc(dataDAzienda: typeof Dati_Azienda, dataBilancio: typeof BilancioOb) {
  try {
    const user = auth.currentUser;
    if (!user) {
      alert("Utente non loggato. Effettua il login per salvare i dati.");
      return false;
    }
    const nomeDocumento = `${dataDAzienda.B11} - ${dataDAzienda.B17}`;
    const path = doc(db, "utenti", user.uid, "analisi", nomeDocumento);

    await setDoc(path, {
      BilancioOb: dataBilancio,
      Dati_Azienda: dataDAzienda
    });
    alert("Dati Salvati");
    return true;
  } catch (error) {
    const msg = getFriendlyFirebaseError(error.code || "generic");
    alert(`Errore durante il salvataggio dati:  ${msg}`);
    return false;
  }
}


//recupera documenti 
export async function getAnalisi(): Promise<string[] | null> {
  try {
    const user = auth.currentUser;
    if (!user) {
      alert("Utente non loggato.");
      return null;
    }

    const collezioneAnalisi = collection(db, "utenti", user.uid, "analisi");
    const snapshot = await getDocs(collezioneAnalisi);

    // Estrae i nomi nella collezione "analisi"
    const nomiAnalisi = snapshot.docs.map(doc => doc.id);

    return nomiAnalisi;
  } catch (error) {
    const msg = getFriendlyFirebaseError(error.code || "generic");
    alert(`Errore durante il recupero delle analisi:  ${msg}`);
    return null;
  }
}
