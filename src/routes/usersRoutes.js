import express from "express";
import { logarUser, cadastrarUser } from "../controller/usersController.js"

const router = express.Router();

//app.use(express.json());

//Rotas dos users
router.post("/login/", logarUser);
router.post("/cadastro/", cadastrarUser);

export default router;