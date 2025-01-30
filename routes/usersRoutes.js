import express from "express";
import {logarUser, cadastrarUser} from "../controllers/usersController.js"

const router = express.Router();

//app.use(express.json());
router.get("/login/", logarUser);
router.post("/cadastro/", cadastrarUser);

export default router;