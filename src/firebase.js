// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth';
import {
  Timestamp,
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  query,
  onSnapshot,
  where,
  deleteDoc,
} from 'firebase/firestore';

// import { getAnalytics, isSupported } from 'firebase/analytics';
// import { getPerformance } from 'firebase/performance';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Performance Monitoring and get a reference to the service
// getPerformance(app);
// const analyticsMock = {
//   logEvent: () => {},
//   setCurrentScreen: () => {},
//   setUserId: () => {},
// };

// Exports
export const auth = getAuth(app);
export const socialAuth = auth;
export const googleAuthProvider = new GoogleAuthProvider();
export const SignInWithPopup = signInWithPopup;
export const SignInWithEmailAndPassword = signInWithEmailAndPassword;
export const SignOut = signOut;
export const SendPasswordResetEmail = sendPasswordResetEmail;
export const CreateUserWithEmailAndPassword = createUserWithEmailAndPassword;
export const facebookAuthProvider = new FacebookAuthProvider();
export const twitterAuthProvider = new TwitterAuthProvider();
export const db = getFirestore(app);
export const Collection = collection;
export const GetDocs = getDocs;
export const GetDoc = getDoc;
export const SetDoc = setDoc;
export const AddDoc = addDoc;
export const UpdateDoc = updateDoc;
export const Doc = doc;
export const Query = query;
export const Where = where;
export const DeleteDoc = deleteDoc;
export const OnSnapshot = onSnapshot;
export const timeStamp = Timestamp;
// const ana = !isSupported ? analyticsMock : getAnalytics(app);
// export const analytics = ana;
