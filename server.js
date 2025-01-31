import express from 'express'
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import tasksRouter from './src/routes/tasksRoutes.js'
import usersRouter from './src/routes/usersRoutes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'src', 'public'))); // Caminho absoluto
//app.use(express.static("src/public"));
app.use(cors());
app.use(express.json());
app.use('/users/', usersRouter);
app.use('/tasks/', tasksRouter);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/public/templates", "login.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});