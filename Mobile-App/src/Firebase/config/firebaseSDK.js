import firebase from 'firebase';

class FirebaseSDK {
    constructor() {
        this.init();
        this.CheckAuth();
    }


    init = () => {
        if (!firebase.apps.length) {
            //avoid re-initializing
            firebase.initializeApp({
                apiKey: "AIzaSyB4O2q844JvXcOpT0J6wreFNT0pP7qfZy4",
                authDomain: "sportsbaze-301710.firebaseapp.com",
                databaseURL: "https://sportsbaze-301710-default-rtdb.firebaseio.com/",
                projectId: "sportsbaze-301710",
                storageBucket: "sportsbaze-301710.appspot.com",
                messagingSenderId: "",
                appId: "1:543709238802:android:e0b8c1d2026282b498eacb",
                measurementId: ""
            });
        }
    }

    CheckAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        });
    }

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                //    user: item.user
            };

            this.db.push(message);

        });
    }

    parse = message => {
        const { user, text, timestamp } = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp);

        return {
            _id,
            createdAt,
            text,
            user
        };
    };

    get = callback => {
        this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
    };

    off() {
        this.db.off()
    }

    get db() {
        return firebase.database().ref("messages");
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }
}


const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;