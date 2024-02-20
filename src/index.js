import React from 'react';
import ReactDOM from 'react-dom';
import { FirebaseContext } from './store/firebaseContext';
import PostContext from './store/firebaseContext';
import { db } from './Firebase/config';
// import SearchContext from './store/searchContext';
import App from './App';

ReactDOM.render(

    <FirebaseContext.Provider value={db}>

        <PostContext>
            <App />
        </PostContext>

    </FirebaseContext.Provider>

    , document.getElementById('root'));
