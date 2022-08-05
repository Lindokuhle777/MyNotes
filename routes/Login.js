import express from "express";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  doc,
  getDoc
} from "firebase/firestore";
const app = express();
import { db } from "../firebase.js";

const router = express.Router();

router.post("/",async (req,res) => {

    const email = req.body.email;
    const password = req.body.password;

    const docRef = doc(db,"Users",email);

    const userDoc = await getDoc(docRef);

    if(userDoc.exists()) {
        const data = userDoc.data();
        
        if(data.email === email && data.password === password) {
            res.send({message:"correct",name:data.name,id:data.id});
        }else{
            res.send("incorrect password");
        }
    }else{
        res.send("no account");

    }

});


export default router;