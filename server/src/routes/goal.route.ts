import { Router } from "express";
import { verifyCookie } from "../middlewares/auth.middleware.js";
import { validate } from "../utils/validate.js";
import {
  createGoal,
  deleteGoal,
  getAllGoals,
  getGoal,
  updateGoal,
} from "../controllers/goal.control.js";

const router = Router();

router.use(verifyCookie);

router.route("/").post(validate, createGoal);
router.route("/").get(validate, getAllGoals);

router.route("/:id").get(validate, getGoal);
router.route("/:id").patch(validate, updateGoal);
router.route("/:id").post(validate, deleteGoal);

export default router;
