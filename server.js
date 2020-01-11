import express from 'express';
import dotenv  from 'dotenv';
import signupRouter from './server/routes/signup';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/signup', signupRouter);
const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Server is listening on ${port}...`);
});

export default app;