import React, { useState, useEffect } from 'react';
import useTransactions from '../hooks/useTransactions';

interface EditTransactionProps {
  transactionId: string;
  onClose: () => void;
}

const EditTransaction: React.FC<EditTransactionProps> = ({ transactionId, onClose }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'income' | 'expense' | undefined>(undefined);
  
  const { transactions, updateTransaction } = useTransactions();
  
  useEffect(() => {
    // Find the transaction with the given ID
    const currentTransaction = transactions.find(t => t._id === transactionId);
    if (currentTransaction) {
      setCategory(currentTransaction.category);
      setAmount(currentTransaction.amount.toString());
      setDate(new Date(currentTransaction.date).toISOString().split("T")[0]);
      setDescription(currentTransaction.description || '');
      setType(currentTransaction.type);
    }
  }, [transactionId, transactions]);

  const formattedDate = date.split('-').reverse().join('/');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTransaction(transactionId, {
        type,
        amount: Number(amount),
        category,
        description,
        date: formattedDate
      });
      onClose();
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full bg-dark flex flex-col justify-center items-center z-50">
      <div className="bg-bg rounded-xl p-6 flex flex-col justify-center items-center w-[90%] max-w-md mx-auto">
        <h1 className="text-black text-2xl font-bold mb-2">Edit Transaction</h1>
        
        <form onSubmit={handleSubmit} className="w-full space-y-2">
        <div className="flex justify-center mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap
                ${type === "income" ? "bg-primary text-dark shadow-md" : "bg-secondary text-gray-600"}
              `}
              onClick={() => setType("income")}
            >
              Income
            </button>
            <button
              type="button"
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap
                ${type === "expense" ? "bg-dark-green text-bg shadow-md" : "bg-secondary text-gray-600"}
              `}
              onClick={() => setType("expense")}
            >
              Expense
            </button>
          </div>
        </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
                <label htmlFor="category" className="block text-sm font-medium text-gray-800 mb-1 ml-4">
                    Category
                </label>
                <input 
                className="w-full bg-white p-3 rounded-3xl text-sm text-black placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                type="text" 
                placeholder="Category" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                />
            </div>
            <div className="flex flex-col w-full">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-800 mb-1 ml-4">
                    Amount
                </label>
                <input 
                className="w-full bg-white p-3 rounded-3xl text-sm text-black placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                type="number" 
                placeholder="Amount" 
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                required
                />
            </div>
          </div>
          
            <label htmlFor="date" className="block text-sm font-medium text-gray-800 mb-1 ml-4">
                Date
            </label>
            <input 
            className="w-full bg-white p-3 rounded-3xl text-sm text-black placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
            type="date"
            placeholder="Select a date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            />
          
            <label htmlFor="description" className="block text-sm font-medium text-gray-800 mb-1 ml-4">
                Description
            </label>
            <textarea 
            className="w-full bg-white p-3 rounded-3xl text-sm text-black placeholder-gray-400 h-[100px] text-left align-text-top resize-none
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
            placeholder="Description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />

          <div className="flex flex-row justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 bg-gray-300 text-gray-700 px-6 py-2 rounded-4xl shadow-md transition-all font-bold hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-primary text-dark-green px-6 py-2 rounded-4xl shadow-md transition-all font-bold hover:bg-dark-green hover:text-bg"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransaction;