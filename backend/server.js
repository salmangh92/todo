import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoutes from "./routes/todoRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

//middelwear
app.use(express.json());
app.use(cors());

//Routes
app.use("/todos", todoRoutes);

//MongoDB verbindung
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB verbinden"))
  .catch((err) => console.log("Fehler beim verbindung auf MongoDB", err));

// Start server
app.listen(PORT, () => console.error(`Server lauft auf port ${PORT}`));
