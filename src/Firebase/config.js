import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAySvqXDEraiD7sEUtWgAL6DF2aADfcaWY",
    authDomain: "olx-app-77137.firebaseapp.com",
    databaseURL: "https://olx-app-77137-default-rtdb.firebaseio.com",
    projectId: "olx-app-77137",
    storageBucket: "olx-app-77137.appspot.com",
    messagingSenderId: "53541274464",
    appId: "1:53541274464:web:90e4fb073767a46cac5405",
    measurementId: "G-E8J3MDFXL9"
  };

  const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);


