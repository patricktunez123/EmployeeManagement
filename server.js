import express from 'express';

const app = express();
app.use(express.json());

const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Server is listening on ${port}...`);
});

export default app;