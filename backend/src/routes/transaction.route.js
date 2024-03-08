import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createTransaction,
  deleteTransaction,
  getAmount,
  getTransactions,
  getWeeklyTransactions,
  updateTransaction,
} from "../controllers/transaction.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/add").post(createTransaction);
router.route("/").get(getTransactions);
router.route("/amount").get(getAmount);
router
  .route("/:transactionId")
  .put(updateTransaction)
  .delete(deleteTransaction);
router.route("/weekly-transactions").get(getWeeklyTransactions);

export default router;
