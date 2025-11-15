import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, createUserWithEmailAndPassword } from "firebase/auth";
import { User, defaultUser, defaultNote } from "./Interfaces";
import { getFirestore, getDocs, setDoc, getDoc, collection, doc } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_DMlTx9Ipc9yx9IPA3lVeITXZD0QhwpE",
  authDomain: "cloudos-12cdc.firebaseapp.com",
  databaseURL: "https://cloudos-12cdc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cloudos-12cdc",
  storageBucket: "cloudos-12cdc.firebasestorage.app",
  messagingSenderId: "710107657823",
  appId: "1:710107657823:web:5d2104048a1587b84b4dea",
  measurementId: "G-VCE7XX9FMR"
};


class Firebase {
    app:FirebaseApp
    firestore:any

    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.firestore = getFirestore(this.app);
    }

    async register(name:string, password:string, addedUser:User|null=null):Promise<any> {
        const user:User = {...defaultUser, name:name, password:password};
        const snap = await setDoc(doc(this.firestore, 'users', user.name), addedUser ? addedUser : defaultUser);
        return snap;
    }

    async login(name:string, password:string):Promise<boolean> {
        return getDocs(collection(this.firestore, 'users')).then(snapshot => {
            let result = false;
            snapshot.forEach(_doc => {
                const data = _doc.data()
                console.log(data.name, name, data.password, password);
                if (data.name == name && data.password == password) {
                    result = true;
                    return
                }
            })
            return result;
        }, snapshot => {return false});
    }

    async getUsers():Promise<User[]> {
        return getDocs(collection(this.firestore, 'users')).then(snapshot => {
            const data:User[] = [];
            snapshot.forEach(_doc => {
                data.push(_doc.data() as User);
            });
            return data;
        }, snapshot => {return []});
    }

    async getUser(name:string):Promise<User | null> {
        const snap = await getDoc(doc(this.firestore, 'users', name))
        if (snap.exists()) {
            const user = snap.data() as User;
            return user;
        }
        return null;
    }

    updateUser(user:User):void {
        setDoc(doc(this.firestore, 'users', user.name), user);
    }
}

export const firebase = new Firebase();
