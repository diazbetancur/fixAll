import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyC-5EjKS24E19QI2XNMza7uD__Ki_Jut9s",
  authDomain: "fixall-7c02d.firebaseapp.com",
  projectId: "fixall-7c02d",
  storageBucket: "fixall-7c02d.appspot.com",
  messagingSenderId: "209507807088",
  appId: "1:209507807088:web:55f9f8888e59cb085229b5"
}

  // Initialize Firebase
 export const firebaseApp = firebase.initializeApp(firebaseConfig)