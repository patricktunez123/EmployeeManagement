import express from 'express';
import StoreEmployeeController from '../controllers/StoreEmployeeController';
import DeleteEmployeeController from '../controllers/DeleteEmployeeController';
import EditEmployeeController from '../controllers/EditEmployeeController';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/', auth, StoreEmployeeController);
router.delete('/:id/', auth, DeleteEmployeeController);
router.put('/:id/', auth, EditEmployeeController);
export default router;
