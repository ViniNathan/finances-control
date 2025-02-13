import express from 'express'; // Import express module
import { protect } from '../middleware/authMiddleware.js'; // Import protect function from authMiddleware.js file
import transactionController from '../controllers/transactionController.js'; // Import transactionController object from transactionController.js file

const router = express.Router(); // Create router object using express Router method
router.use(protect); // Protect all routes in this file

// Define routes
router.post("/", transactionController.createTransaction);
router.get("/", transactionController.getTransactions);
router.get("/:id", transactionController.getTransactionById);
router.put("/:id", transactionController.updateTransaction);
router.delete("/all", transactionController.deleteAllTransactions);
router.delete("/:id", transactionController.deleteTransaction);

export default router; // Export router object