import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDgPPEToxqNrQ58qtxfQT367PSqlaj-uuc',
  authDomain: 'quackerap.firebaseapp.com',
  databaseURL: 'https://quackerap.firebaseio.com',
  projectId: 'quackerap',
  storageBucket: 'quackerap.appspot.com',
  messagingSenderId: '631583098473',
}
firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const usersDucksExpirationLength = 100000
export const usersExpirationLength = 100000