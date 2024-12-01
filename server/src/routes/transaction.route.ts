import { Router } from "express";
import { verifyCookie } from "../middlewares/auth.middleware.js";
import { validate } from "../utils/validate.js";
import { allTransactions, createTransaction } from "../controllers/transaction.control.js";

const router = Router();

router.use(verifyCookie);

router.route("/").post(validate, createTransaction);

router.route("/").get(validate, allTransactions);


// router.route("/user/:id").get(validate);
// router.route("/user/:id").get(validate);


export default router;
