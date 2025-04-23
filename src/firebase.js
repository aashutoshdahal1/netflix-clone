import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAMzbpwhM63kjR2PGnDskgZV7Fx9N__2qQ",
  authDomain: "netflix-clone-225e4.firebaseapp.com",
  projectId: "netflix-clone-225e4",
  storageBucket: "netflix-clone-225e4.firebasestorage.app",
  messagingSenderId: "288339411688",
  appId: "1:288339411688:web:3f49c09619eeefc499bf5d",
  measurementId: "G-YE76F9GQJS",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};
const logout = () => {
  signOut(auth);
};
export { auth, db, login, signup, logout };
