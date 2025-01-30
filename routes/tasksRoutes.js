import express from "express";
import {listarTasks, criaTask, alterarTask, deletarTask, filtraTarefa} from "../controllers/tasksController.js"

const router = express.Router();

//app.use(express.json());
router.get("/:idUser/", listarTasks);
router.post("/criar/:idUser/", criaTask);
router.put("/alterar/:idTask/", alterarTask);
router.delete("/deletar/:idTask/", deletarTask);
router.get("/filtrar/:idUser/", filtraTarefa);

export default router;