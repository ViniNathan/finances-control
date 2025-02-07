import express from 'express'; // Import express module
const router = express.Router(); // Create router object using express Router method
import transactionController from '../controllers/transactionController.js'; // Import transactionController object from transactionController.js file

// Define routes
router.post("/", transactionController.createTransaction);
router.get("/", transactionController.getTransactions);
router.get("/:id", transactionController.getTransactionById);
router.put("/:id", transactionController.updateTransaction);
router.delete("/all", transactionController.deleteAllTransactions);
router.delete("/:id", transactionController.deleteTransaction);

export default router; // Export router object