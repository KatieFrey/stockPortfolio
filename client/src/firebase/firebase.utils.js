import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB4op2RXRGlOhatncYOSb-HyhuEt2-HT1A",
  authDomain: "my-stock-portfolio-a6e5e.firebaseapp.com",
  databaseURL: "https://my-stock-portfolio-a6e5e.firebaseio.com",
  projectId: "my-stock-portfolio-a6e5e",
  storageBucket: "my-stock-portfolio-a6e5e.appspot.com",
  messagingSenderId: "853804645767",
  appId: "1:853804645767:web:ed54a9d1baacb2688d2722",
  measurementId: "G-Q40TVKBGR8"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  //Snapshot has an "exists" property with a boolean value (true/false)
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const balance = 5000;

    try {
      //Creating a new user with the .set method
      await userRef.set({
        displayName,
        balance: balance,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating message: ", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
