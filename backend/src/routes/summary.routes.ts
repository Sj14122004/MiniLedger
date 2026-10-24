import { Router } from 'express';
import * as ctrl from '../controllers/loan.controller';
import { requireAuth } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
router.get('/', requireAuth, asyncHandler(ctrl.summary));
export default router;
