import express from "express";
import { listarTasks, criarTask, alterarTask, deletarTask, buscarDados } from "../controller/tasksController.js"

const router = express.Router();

//app.use(express.json());

//Rotas das tasks
router.get("/:idUser/", listarTasks);
router.post("/criar/:idUser/", criarTask);
router.put("/alterar/:idTask/", alterarTask);
router.delete("/deletar/:idTask/", deletarTask);
router.get("/dashboards/:idUser/", buscarDados);

export default router;