import { Router } from "express";
import { verifyCookie } from "../middlewares/auth.middleware.js";
import { validate } from "../utils/validate.js";
import {
  allCategories,
  allTransactions,
  createCategory,
  createTransaction,
  deleteTransaction,
  getTransaction,
  totalBalance,
  totalExpense,
  totalIncome,
  updateTransaction,
} from "../controllers/transaction.control.js";

const router = Router();

router.use(verifyCookie);

router.route("/category").get(validate, allCategories);
router.route("/category").post(validate, createCategory);

router.route("/transaction/").post(validate, createTransaction);
router.route("/transaction/").get(validate, allTransactions);
router.route("/transaction/:id").patch(validate, updateTransaction);
router.route("/transaction/:id").get(validate, getTransaction);
router.route("/transaction/:id").delete(validate, deleteTransaction);

router.route("/income").get(validate, totalIncome);
router.route("/expense").get(validate, totalExpense);
router.route("/balance").get(validate, totalBalance);

export default router;
