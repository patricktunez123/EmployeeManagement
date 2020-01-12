import express from 'express';
import StoreEmployeeController from '../controllers/StoreEmployeeController';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/', auth, StoreEmployeeController);

export default router;
