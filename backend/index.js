import cors from "cors";
import express from "express";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
// import { db } from "./firebase-config.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})