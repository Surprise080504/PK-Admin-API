// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCs4C76_4lAE04F6ugh78BhkQMZVGxmB0w',
  authDomain: 'pk-admin-panel.firebaseapp.com',
  projectId: 'pk-admin-panel',
  storageBucket: 'pk-admin-panel.appspot.com',
  messagingSenderId: '1067101636111',
  appId: '1:1067101636111:web:9e56a4bbb176387f02057a',
  measurementId: 'G-HLB3QHBD9Y',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

module.exports = firebaseApp;
