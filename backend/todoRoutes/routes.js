import express from "express";
import Todo from "../models/todo.js";

const router = express.Router();

// Get - alle todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Todo nicht gefunden" });
  }
});

// POST neues Todo Erstellen
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    const newTodo = await Todo.create({ title });

    res.json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fehler beim Todo erstellen" });
  }
});

// PUT Todo anhand der ID aktualisieren
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({ message: "Todo nicht gefunden" });
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fehler beim todo aktualisieren" });
  }
});

// DELETE Todo anhand der ID löschen
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Todo.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ message: "Todo nicht gefunden" });
    }

    res.json({
      message: "Todo erfolgreich gelöscht",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fehler beim delete des todos" });
  }
});
export default router;
