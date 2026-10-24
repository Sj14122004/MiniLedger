import { Router } from 'express';
import * as ctrl from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { requestOtpSchema, verifyOtpSchema } from '../validators/schemas';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
router.post('/request-otp', validate(requestOtpSchema), asyncHandler(ctrl.requestOtp));
router.post('/verify-otp', validate(verifyOtpSchema), asyncHandler(ctrl.verifyOtp));
export default router;
