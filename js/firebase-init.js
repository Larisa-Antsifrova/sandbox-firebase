// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyClwuIdjy9X7vWoaixpuH0Re2Mxg5RotjI",
  authDomain: "learning-firebase-auth-b17fa.firebaseapp.com",
  projectId: "learning-firebase-auth-b17fa",
  storageBucket: "learning-firebase-auth-b17fa.appspot.com",
  messagingSenderId: "291935088247",
  appId: "1:291935088247:web:34143ab1d2f869ff052072",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
console.log("auth", auth);
const db = firebase.firestore();
console.log("db", db);

// update firestore settings
db.settings({ timestampsInSnapshots: true });
