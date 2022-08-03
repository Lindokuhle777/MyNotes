import cors from "cors";
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
import {uid} from "uid";

const router = express.Router();

router.post("/", async(req,res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    const docRef = doc(db,"Users",email);

    const userDoc = await getDoc(docRef);

    if(userDoc.exists()) {
        res.send("exists")
    }else{
        const uuid = uid(20);
        let data = {
            email,name,password,id:uuid
        }

        await setDoc(docRef, data);

        res.send("added");
    }

})



export default router;