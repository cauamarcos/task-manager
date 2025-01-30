import express from 'express'
import routes from './routes/tasksRoutes.js' 

const app = express();
const PORT = 3000;

app.use(express.json());
routes(app)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});