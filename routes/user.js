import express from 'express';
import {
    signup,
    login,
    forgotPassword,
    verifyResetPasswordToken,
    resetPassword,
    getProfileDetails, updateProfile
} from "../controllers/user.js";

const router = express.Router();

router
.route("/signup")
.post(signup)

router
    .route("/login")
    .post(login)

router.route("/forgotPassword")
    .post(forgotPassword)
router.route("/verify")
    .post(verifyResetPasswordToken)
router.route("/reset")
    .post(resetPassword)
router.route("/profile/:userId")
    .get(getProfileDetails)
    .put(updateProfile)




export default router;