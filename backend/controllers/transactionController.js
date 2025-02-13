import Transaction from "../models/transaction.model.js";

const transactionController = {
  //Function to create a new transaction
  createTransaction: async (req, res) => {
    try {
      const {type, amount, category, description, date } = req.body;
      const userId = req.user._id;
      const newTransaction = new Transaction({ userId, type, amount, category, description, date });
      await newTransaction.save();
      res.status(201).json(newTransaction);
    } catch (error) {
      res.status(500).json({ message: "Error while creating transaction", error });
    }
  },

  //Function to get all transactions
  getTransactions: async (req, res) => {
    try {
      const userId = req.user._id;
      const transactions = await Transaction.find({ userId }).populate("category");
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Error in transactions search", error });
    }
  },

  // Function to get a transaction by id
  getTransactionById: async (req, res) => {
    try {
      const transaction = await Transaction.findOne({
        _id: req.params.id,
        userId: req.user._id 
      }).populate("category");
      if (!transaction) return res.status(404).json({ message: "Transaction not found" });
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ message: "Error in transaction search", error });
    }
  },

  //Function to update a transaction
  updateTransaction: async (req, res) => {
    try {
      const [day, month, year] = req.body.date.split('/');
      req.body.date = new Date(year, month - 1, day);
      const updatedTransaction = await Transaction.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.user._id 
        },
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedTransaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }  
      
      res.json(updatedTransaction);
    } catch (error) {
      res.status(500).json({ message: "Error while updating transaction", error });
    }
  },

  //Function to delete a transaction
  deleteTransaction: async (req, res) => {
    try {
      const deletedTransaction = await Transaction.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id
      });
      
      if (!deletedTransaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      
      res.json({ message: "Transaction removed" });
    } catch (error) {
      res.status(500).json({ message: "Error while deleting transaction", error });
    }
  },

  //Function to delete all transactions off user
  deleteAllTransactions: async (req, res) => {
    try {
      const userId = req.user._id;
      await Transaction.deleteMany({ userId });
      res.json({ message: "All transactions removed", user: userId });
    } catch (error) {
      res.status(500).json({ message: "Error while deleting transactions", error });
    }
  }

};

export default transactionController;
