import React from 'react';
import ReactDOM from 'react-dom';
import { FirebaseContext } from './store/firebaseContext';
import { db } from './Firebase/config';
import App from './App';

ReactDOM.render(
    <FirebaseContext.Provider value={db}>
        <App />
    </FirebaseContext.Provider>

    , document.getElementById('root'));
