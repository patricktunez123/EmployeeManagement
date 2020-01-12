import express from 'express';
import StoreEmployeeController from '../controllers/StoreEmployeeController';
import DeleteEmployeeController from '../controllers/DeleteEmployeeController';
import EditEmployeeController from '../controllers/EditEmployeeController';
import ActivateEmployeeController from '../controllers/ActivateEmployeeController';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/', auth, StoreEmployeeController);
router.delete('/:id/', auth, DeleteEmployeeController);
router.put('/:id/', auth, EditEmployeeController);
router.put('/:id/activate/', auth, ActivateEmployeeController);
export default router;
