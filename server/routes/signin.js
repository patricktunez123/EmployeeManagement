import express from 'express';
import SigninController from '../controllers/SigninController';

const router = express.Router();

router.post('/', SigninController);

export default router;
