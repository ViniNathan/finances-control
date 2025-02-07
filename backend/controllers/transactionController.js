import Transaction from "../models/transaction.model.js";

const transactionController = {
  //Function to create a new transaction
  createTransaction: async (req, res) => {
    try {
      const { userId, type, amount, categoryId, description, date } = req.body;
      const newTransaction = new Transaction({ userId, type, amount, categoryId, description, date });
      await newTransaction.save();
      res.status(201).json(newTransaction);
    } catch (error) {
      res.status(500).json({ message: "Error while creating transaction", error });
    }
  },

  //Function to get all transactions
  getTransactions: async (req, res) => {
    try {
      const transactions = await Transaction.find({ userId: req.query.userId }).populate("categoryId");
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Error in transactions search", error });
    }
  },

  // Function to get a transaction by id
  getTransactionById: async (req, res) => {
    try {
      const transaction = await Transaction.findById(req.params.id).populate("categoryId");
      if (!transaction) return res.status(404).json({ message: "Transaction not found" });
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ message: "Error in transaction search", error });
    }
  },

  //Function to update a transaction
  updateTransaction: async (req, res) => {
    try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedTransaction);
    } catch (error) {
      res.status(500).json({ message: "Error while updating transaction", error });
    }
  },

  //Function to delete a transaction
  deleteTransaction: async (req, res) => {
    try {
      await Transaction.findByIdAndDelete(req.params.id);
      res.json({ message: "Transação removida com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar transação", error });
    }
  }
};

export default transactionController;
