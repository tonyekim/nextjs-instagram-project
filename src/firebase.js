// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "next-project-insta.firebaseapp.com",
  projectId: "next-project-insta",
  storageBucket: "next-project-insta.appspot.com",
  messagingSenderId: "692940244470",
  appId: "1:692940244470:web:5c6896dcd3573b5f4673d7",
  measurementId: "G-MN5HHRR69N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);



// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if 
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*')
//     }
//   }
// }