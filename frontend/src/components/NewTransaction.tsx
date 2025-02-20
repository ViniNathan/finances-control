import { useState } from "react";
import useTransactions from "../hooks/useTransactions";

interface NewTransactionProps {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  fetchTransactions: () => void;
}

const NewTransaction: React.FC<NewTransactionProps> = ({setIsAdding, fetchTransactions}) => {
  const [transactionType, setTransactionType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const { createTransaction } = useTransactions();

  const handleAddTransaction = async (e: any) => {
    e.preventDefault();
    try {
      await createTransaction({
        type: transactionType,
        category,
        amount: Number(amount),
        date,
        description,
      });
      fetchTransactions();
      setIsAdding(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 md:px-8">
      <h2 className="text-xl sm:text-2xl font-bold text-dark-green text-center mb-6">
        Add Transaction
      </h2>
      
      <form className="w-full flex flex-col gap-4" onSubmit={handleAddTransaction}>
        <div className="flex justify-center mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap
                ${transactionType === "income" ? "bg-primary text-dark shadow-md" : "bg-secondary text-gray-600"}
              `}
              onClick={() => setTransactionType("income")}
            >
              Income
            </button>
            <button
              type="button"
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap
                ${transactionType === "expense" ? "bg-dark-green text-bg shadow-md" : "bg-secondary text-gray-600"}
              `}
              onClick={() => setTransactionType("expense")}
            >
              Expense
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-1">
          <input 
            className="w-full bg-secondary p-3 rounded-3xl text-sm text-black placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
            type="text" 
            placeholder="Category" 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          
          <input 
            className="w-full bg-secondary p-3 rounded-3xl text-sm text-black placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
            type="number" 
            placeholder="Amount" 
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
          />
        </div>
        <input 
          className="w-full bg-secondary p-3 rounded-3xl text-sm text-black placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
          type="date"
          placeholder="Select a date"
          value={date || new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
        />
        
        <textarea 
          className="w-full bg-secondary p-3 rounded-3xl text-sm text-black placeholder-gray-400 h-[100px] text-left align-text-top resize-none
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
          placeholder="Description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
          <button
            type="submit"
            className="w-full bg-primary text-dark-green px-6 py-2 rounded-4xl shadow-md transition-all font-bold hover:bg-dark-green hover:text-bg"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTransaction;
