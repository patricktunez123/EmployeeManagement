import express from 'express';
import EmployeeController from '../controllers/EmployeeController';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/', auth, EmployeeController.store);
router.delete('/:id/', auth, EmployeeController.delete);
router.put('/:id/', auth, EmployeeController.edit);
router.put('/:id/activate/', auth, EmployeeController.activate);
router.put('/:id/suspend/', auth, EmployeeController.suspend);
router.post('/search', auth, EmployeeController.search);
export default router;
