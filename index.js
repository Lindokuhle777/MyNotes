import cors from "cors";
import express from "express";

import NewUser from "./routes/NewUser.js";
import Login from "./routes/Login.js";
import Collections from "./routes/Collections.js";
import Notes from "./routes/Notes.js";

const app = express();
const PORT = process.env.PORT || 5000;
// app.use(express.static("frontend/build"))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static("frontend/build"))
}

app.use(express.json());
app.use(cors());

app.use("/NewUser", NewUser);

app.use("/Login", Login);

app.use("/Collections", Collections);

app.use("/Notes",Notes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
