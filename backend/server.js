import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoutes from "./todoRoutes/routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

//middelwear
app.use(express.json());

//Route
app.use("/todos", todoRoutes);

//MongoDB verbinden
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB verbinden"))
  .catch((err) => console.error("Fhler beim verbindung zu MongoDB"));

// Server start
app.listen(PORT, () => {
  console.log(`Server läuft auf port ${PORT}`);
});
