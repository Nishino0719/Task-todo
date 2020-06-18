import firebase from'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

if(!firebase.apps.length){
    const config = {
        apiKey: "AIzaSyCqBbQkYCGopImGczmMef9QYh6OvmBKn0E",
        authDomain: "task-init.firebaseapp.com",
        databaseURL: "https://task-init.firebaseio.com",
        projectId: "task-init",
        storageBucket: "task-init.appspot.com",
        messagingSenderId: "task-init.appspot.com"
    }
    firebase.initializeApp(config)
}

const db = firebase.firestore()
export {
    firebase,
    db
}