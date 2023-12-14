import React from 'react';
import ReactDOM from 'react-dom';
import { FirebaseContext } from './store/firebaseContext';
import Context from './store/firebaseContext';
import { db } from './Firebase/config';
import App from './App';

ReactDOM.render(

    <FirebaseContext.Provider value={db}>
        <Context>
            <App />
        </Context>
    </FirebaseContext.Provider>

    , document.getElementById('root'));
