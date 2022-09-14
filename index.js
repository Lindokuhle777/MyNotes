import cors from "cors";
import express from "express";
import NewUser from "./routes/NewUser.js";
import Login from "./routes/Login.js";
import Collections from "./routes/Collections.js";
import Notes from "./routes/Notes.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = dirname(fileURLToPath(import.meta.url));


if(process.env.NODE_ENV === 'production'){
  app.use(express.static(join(__dirname, "frontend/build")));
}

app.use(express.json());
app.use(cors());

app.use("/NewUser", NewUser);

app.use("/Login", Login);

app.use("/Collections", Collections);

app.use("/Notes",Notes);

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "frontend/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
