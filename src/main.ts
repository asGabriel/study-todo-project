import express from 'express';
import 'dotenv/config'
import taskRouter from './routes/task';

const app = express();
const port = Number(process.env.SERVER_PORT);

app.use(express.json());
app.use('/api', taskRouter)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
