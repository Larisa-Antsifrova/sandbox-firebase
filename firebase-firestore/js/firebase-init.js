// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBKIyn-G-GUD9XbsH_jDwy8o1YNJBxIsX0",
  authDomain: "learning-firebase-firest-448bf.firebaseapp.com",
  projectId: "learning-firebase-firest-448bf",
  storageBucket: "learning-firebase-firest-448bf.appspot.com",
  messagingSenderId: "550707091036",
  appId: "1:550707091036:web:cd73567678726c10737899",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
