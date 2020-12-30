/* eslint-disable */ 
import { initializeApp, firestore} from 'firebase'
export const firebase = require('firebase')
require('firebase/firestore')

export const firebaseApp = initializeApp({
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: 'ewaste-project.firebaseapp.com',
  databaseURL: 'https://ewaste-project.firebaseio.com',
  projectId: 'ewaste-project',
  storageBucket: 'ewaste-project.appspot.com',
  messagingSenderId: '894233052328',
  appId: '1:894233052328:web:135e14709a4d186a85ee9d',
  measurementId: 'G-8X22KC0ZHB'
})

export const firebaseFirestore = firebaseApp.firestore()