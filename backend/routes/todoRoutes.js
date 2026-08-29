import express from "express";
import Todo from "../models/todo-model.js";

const router = express.Router();

//GET - fetch alle todos
router.get("/", async (req, res) => {
  try {
    const todo = await Todo.find();
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fehler beim fetch des todos" });
  }
});

//POST - eines todos erstellen
router.post("/", async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fehler beim todo erstellen" });
  }
});

//PUT - aktuailisieren eines todos
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(update);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fehler beim aktualisieren des Todos" });
  }
});

//DELETE - löschen eines todos
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.findByIdAndDelete(id);
    res.json(deleted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fehler beim löschen des todos" });
  }
});
export default router;
