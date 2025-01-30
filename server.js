import express from 'express'
import cors from "cors";
import tasksRouter from './routes/tasksRoutes.js' 
import usersRouter from './routes/usersRoutes.js'

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/users/', usersRouter);
app.use('/tasks/', tasksRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});