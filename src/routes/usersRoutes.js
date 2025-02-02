import express from "express";
import { logarUser, cadastrarUser, logoutUser } from "../controller/usersController.js"

const router = express.Router();

//app.use(express.json());

//Rotas dos users
router.post("/login/", logarUser);
router.post("/cadastro/", cadastrarUser);
router.post("/logout/", logoutUser)

export default router;