import { Router } from "express";
import { verifyCookie } from "../middlewares/auth.middleware.js";
import { validate } from "../utils/validate.js";

const router = Router();

router.use(verifyCookie);

router.route("/").post(validate);
// router.route("/").get(validate, getAllGoals);

// router.route("/:id").get(validate, getGoal);
// router.route("/:id").patch(validate, updateGoal);
// router.route("/:id").post(validate, deleteGoal);

export default router;


// b. Investments Endpoints
// Add an Investment

// POST /api/investments
// Body:
// json
// Copy code
// {
//   "name": "Apple Stock",
//   "amount": 1000,
//   "type": "stock",
//   "description": "Investment in Apple Inc."
// }
// Response:
// json
// Copy code
// {
//   "id": 1,
//   "name": "Apple Stock",
//   "amount": 1000,
//   "returns": 0,
//   "type": "stock"
// }
// Update Investment

// PATCH /api/investments/:id
// Body:
// json
// Copy code
// {
//   "returns": 200
// }
// Response:
// json
// Copy code
// {
//   "id": 1,
//   "name": "Apple Stock",
//   "amount": 1000,
//   "returns": 200,
//   "type": "stock"
// }
// List Investments

// GET /api/investments
// Response:
// json
// Copy code
// [
//   {
//     "id": 1,
//     "name": "Apple Stock",
//     "amount": 1000,
//     "returns": 200,
//     "type": "stock"
//   }
// ]
// Delete Investment

// DELETE /api/investments/:id
// 3. Features to Add
// a. Budgeting
// Allow users to set monthly budgets per category (e.g., "Food: $500").
// Notify users when they exceed their budget.
// b. Recurring Transactions
// Support for adding recurring expenses/incomes (e.g., subscriptions or salary).
// Auto-generate these transactions each month.
// c. Reports
// Generate visual reports (pie charts, line graphs) for income vs. expenses.
// Categorize transactions by week, month, or year.
// d. Debt Management
// Allow users to track loans or credit card payments.
// Include interest rates and payment reminders.
// e. Currency Support
// Support multiple currencies with live exchange rates.
// f. Notifications
// Reminders for due payments, goals nearing deadlines, or exceeded budgets.
// g. Integrations
// Sync with bank accounts or financial services for automatic transaction imports.
// Let me know if you'd like detailed implementations for any of these!