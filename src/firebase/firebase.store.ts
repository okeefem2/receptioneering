import { createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { FIREBASE_CONFIG } from '../config/config';

class FirebaseStore {
    firestore: firebase.firestore.Firestore;
    storage: firebase.storage.Storage;

    constructor() {
        firebase.initializeApp(FIREBASE_CONFIG);
        this.firestore = firebase.firestore();
        this.storage = firebase.storage();
    }
}

export const firebaseStore = new FirebaseStore();
export const firebaseContext = createContext(firebaseStore);
