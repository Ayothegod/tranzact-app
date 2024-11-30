import { Router } from "express";
import {
  userProfile,
  loginController,
  registerController,
  logoutController,
} from "../controllers/auth.control.js";
import { verifyCookie } from "../middlewares/auth.middleware.js";
import { validate } from "../utils/validate.js";

const router = Router();

router.route("/register").post(validate, registerController);
router.route("/login").post(validate, loginController);
router.route("/logout").delete(validate, logoutController);

router.use(verifyCookie);

router.route("/user/:id").get(validate, userProfile);

export default router;
