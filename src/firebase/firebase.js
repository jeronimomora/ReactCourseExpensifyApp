import * as firebase from 'firebase'

// Initialize Firebase
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

firebase.initializeApp(config);

const database = firebase.database()

export { firebase, database as default }

// // database.ref().on('value', (snapshot) => {
// //   console.log(snapshot.val().age)
// // })

// // database.ref().set({
// //   name: 'Jeronimo Mora',
// //   age: 25,
// //   isSingle: false,
// //   location: {
// //     city: 'San Francisco',
// //     country: 'United States'
// //   }
// // })

// //database.ref().set('This is my data.')

// database.ref('age').set(27)