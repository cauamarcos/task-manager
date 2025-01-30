import express from "express";
import cors from "cors";
import {listarTasks, inserirTask, alterarTask, deletarTask} from "../controller/tasksController.js"

const routes = (app) => {
    app.use(express.json());

    app.use(cors());

    app.get("/tasks/", listarTasks);
    app.post("/tasks/inserir/", inserirTask);
    app.put("/tasks/alterar/:id", alterarTask);
    app.delete("/tasks/deletar/:id", deletarTask)
}

export default routes;