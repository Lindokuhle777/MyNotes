import cors from "cors";
import express from "express";

import NewUser from "./routes/NewUser.js";
import Login from "./routes/Login.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/NewUser", NewUser);

app.use("/Login", Login);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
