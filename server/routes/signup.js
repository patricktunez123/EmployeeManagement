import express from 'express';
import SignupController from '../controllers/SignupController';

const router = express.Router();

router.post('/', SignupController);

export default router;