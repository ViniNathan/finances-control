import { useState } from "react";

interface NewTransactionProps {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTransaction: React.FC<NewTransactionProps> = ({ setIsAdding }) => {
  const [transactionType, setTransactionType] = useState<"Income" | "Expense">("Income");

  return (
    <div className="w-full max-w-md mx-auto px-6 md:px-8">
      <h2 className="text-xl sm:text-2xl font-bold text-dark-green text-center mb-6">
        Add Transaction
      </h2>
      
      <form className="w-full flex flex-col gap-4">
        <div className="flex justify-center mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap
                ${transactionType === "Income" ? "bg-primary text-dark shadow-md" : "bg-secondary text-gray-600"}
              `}
              onClick={() => setTransactionType("Income")}
            >
              Income
            </button>
            <button
              type="button"
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap
                ${transactionType === "Expense" ? "bg-dark-green text-bg shadow-md" : "bg-secondary text-gray-600"}
              `}
              onClick={() => setTransactionType("Expense")}
            >
              Expense
            </button>
          </div>
        </div>

        <input 
          className="w-full bg-secondary p-3 rounded-3xl text-sm text-gray-800 placeholder-gray-500" 
          type="text" 
          placeholder="Category" 
        />
        
        <input 
          className="w-full bg-secondary p-3 rounded-3xl text-sm text-gray-800 placeholder-gray-500" 
          type="number" 
          placeholder="Amount" 
        />
        
        <input 
          className="w-full bg-secondary p-3 rounded-3xl text-sm text-gray-800 placeholder-gray-500" 
          type="date"
        />
        
        <textarea 
          className="w-full bg-secondary p-3 rounded-3xl text-sm text-gray-800 placeholder-gray-500 h-[100px] text-left align-text-top resize-none" 
          placeholder="Description" 
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