import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCc13J5YVIrsfXsp_yLHOaC56nfBeq0VEA",
  authDomain: "signal-project-a0a43.firebaseapp.com",
  projectId: "signal-project-a0a43",
  storageBucket: "signal-project-a0a43.appspot.com",
  messagingSenderId: "471610571218",
  appId: "1:471610571218:web:8ef25fca77ddd65bb3700b",
}

let app

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const db = app.firestore()
const auth = firebase.auth()

export { db, auth }
