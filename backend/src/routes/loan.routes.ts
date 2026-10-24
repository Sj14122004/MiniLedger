import { Router } from 'express';
import * as ctrl from '../controllers/loan.controller';
import { requireAuth } from '../middleware/auth';
import { upload } from '../middleware/upload';
import { validate } from '../middleware/validate';
import { createLoanSchema } from '../validators/schemas';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
router.use(requireAuth); // everything below needs a logged-in user

router.post('/', upload.single('receipt'), validate(createLoanSchema), asyncHandler(ctrl.create));
router.get('/', asyncHandler(ctrl.list));
router.post('/:id/repay', asyncHandler(ctrl.repay));
export default router;
