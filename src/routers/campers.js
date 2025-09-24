import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getCamperByIdController,
  getCampersController,
} from '../controllers/campers.js';

const router = Router();

router.get('/campers', ctrlWrapper(getCampersController));
router.get('/campers/:camperId', ctrlWrapper(getCamperByIdController));

export default router;
