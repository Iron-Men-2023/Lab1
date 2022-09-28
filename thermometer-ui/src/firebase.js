import {initializeApp} from "firebase/app";
import { getDatabase} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCPTlliO-fk-dtoWylXPSLgK5p4KDzs1Do",
    authDomain: "lab1-43f1f.firebaseapp.com",
    databaseURL: "https://lab1-43f1f-default-rtdb.firebaseio.com",
    projectId: "lab1-43f1f",
    storageBucket: "lab1-43f1f.appspot.com",
    messagingSenderId: "371857379676",
    appId: "1:371857379676:web:8c318cd5f78717c44df199",
    measurementId: "G-S3SDZ11KE4"
};
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
