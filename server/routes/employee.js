import express from 'express';
import EmployeeController from '../controllers/EmployeeController';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/', auth, EmployeeController);

export default router;
