import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config=
{
    apiKey: "AIzaSyDKxUoWLSvYsS0ybUc8AYq1wU4GYmpOCYA",
    authDomain: "clothe-world.firebaseapp.com",
    databaseURL: "https://clothe-world.firebaseio.com",
    projectId: "clothe-world",
    storageBucket: "clothe-world.appspot.com",
    messagingSenderId: "293183076291",
    appId: "1:293183076291:web:d46b21963e63c58890ef76",
    measurementId: "G-F7ET802X2G"
  };

  export const createUserProfileDocument = async (userAuth, additionalData)=>{
    if(!userAuth)
      return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    if(!snapshot.exists){
      const {displayName,email} = userAuth;
      const createdAt = new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user',error.message);
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt : 'select_account'});
  export const signInWithGoogle =() =>auth.signInWithPopup(provider);
  
  export default firebase;
