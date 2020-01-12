import express from 'express';
import StoreEmployeeController from '../controllers/StoreEmployeeController';
import DeleteEmployeeController from '../controllers/DeleteEmployeeController';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/', auth, StoreEmployeeController);
router.delete('/:id/', auth, DeleteEmployeeController);

export default router;
