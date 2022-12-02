import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import dotenv from "dotenv";
import supervisors from "./routes/supervisors.js";

const app = new express();
const router = express.Router();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
dotenv.config();

// ROUTES
app.use("/api", supervisors);

app.listen("8083", () => {
  console.log(`Listening on 8083:`);
});
