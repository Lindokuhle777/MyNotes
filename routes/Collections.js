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

router.post("/newCollection", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const id = req.body.id;

  const ref = doc(db, "Users", email);
  const userDoc = await getDoc(ref);

  try {
    await updateDoc(ref, {
      collections: [...userDoc.data().collections, { name, id }],
    });
    res.send("added");
  } catch (err) {
    await updateDoc(ref, { collections: [{ name, id }] });
    res.send("added");
  }
});

router.post("/getCollections", async (req, res) => {
  const email = req.body.email;

  const ref = doc(db, "Users", email);
  const userDoc = await getDoc(ref);

  const collections = userDoc.data().collections;

  if(collections){
    res.send(collections)
  }else{
    res.send([])
  }

  
});

export default router;
