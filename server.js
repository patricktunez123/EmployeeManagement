import express from 'express';
import dotenv  from 'dotenv';
import signupRouter from './server/routes/signup';
import signinRouter from './server/routes/signin';
import employeeRouter from './server/routes/employee';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/employees', employeeRouter);
const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Server is listening on ${port}...`);
});

export default app;