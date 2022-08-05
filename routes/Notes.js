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
  getDoc,
} from "firebase/firestore";
const app = express();
import { db } from "../firebase.js";
import { uid } from "uid";

const router = express.Router();

router.post("/addNotes", async (req, res) => {
  const collectionID = req.body.id;
  const note = req.body.note;

  const ref = doc(db, "Notes", collectionID);
  const userDoc = await getDoc(ref);

  if (userDoc.exists()) {
    await updateDoc(ref, { notes: [...userDoc.data().notes, note] });
  } else {
    await setDoc(ref, { notes: [note] });
  }

  const snap = await getDoc(ref);
  const notes = snap.data().notes;
  const lastElem = {...notes[notes.length -1],index:notes.length -1}
  
  res.send(lastElem);
});

router.post("/getNotes", async (req, res) => {
    const collectionID = req.body.id;

    const ref = doc(db, "Notes", collectionID);
    const userDoc = await getDoc(ref);

    if(userDoc.exists()){
        let temp = []
        userDoc.data().notes.map((item,index) => {
          temp.push({...item,index})
        });
        res.send(temp);
    }else{
        res.send([])
    }

});



export default router;
