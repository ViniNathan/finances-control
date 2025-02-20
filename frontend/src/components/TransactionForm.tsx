import React from "react";

interface TransactionFormProps {
  transactionType: "income" | "expense" | undefined;
  setTransactionType: (type: "income" | "expense") => void;
  category: string;
  setCategory: (category: string) => void;
  amount: string;
  setAmount: (amount: string) => void;
  date: string;
  setDate: (date: string) => void;
  description: string;
  setDescription: (description: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText: string;
  showCancelButton?: boolean;
  onCancel?: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  transactionType,
  setTransactionType,
  category,
  setCategory,
  amount,
  setAmount,
  date,
  setDate,
  description,
  setDescription,
  onSubmit,
  submitButtonText,
  showCancelButton = false,
  onCancel
}) => {
  return (
    <form className="w-full flex flex-col gap-2" onSubmit={onSubmit}>
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
      
      <div className="flex flex-row gap-2">
        <div className="flex flex-col justify-center items-start w-full gap-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-800 ml-3">
                Category
            </label>
            <input 
            className="w-full bg-secondary p-3 rounded-3xl text-sm text-black placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
            type="text" 
            placeholder="Category" 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            />
        </div>

        <div className="flex flex-col justify-center items-start w-full gap-2">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-800 ml-3">
                Amount
            </label>
            <input 
            className="w-full bg-secondary p-3 rounded-3xl text-sm text-black placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
            type="number" 
            placeholder="Amount" 
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            required
            />
        </div>
        </div>

      
      <label htmlFor="date" className="block text-sm font-medium text-gray-800 ml-3">
         Date
      </label>
      <input 
        className="w-full bg-secondary p-3 rounded-3xl text-sm text-black placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
        type="date"
        placeholder="Select a date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      
      <label htmlFor="description" className="block text-sm font-medium text-gray-800 ml-3">
        Description
      </label>
      <textarea 
        className="w-full bg-secondary p-3 rounded-3xl text-sm text-black placeholder-gray-400 h-[100px] text-left align-text-top resize-none
        focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
        placeholder="Description" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className={`flex ${showCancelButton ? "flex-row justify-between" : "flex-col sm:flex-row"} gap-3 sm:gap-4 mt-4`}>
        {showCancelButton && (
          <button
            type="button"
            onClick={onCancel}
            className="w-1/2 bg-gray-300 text-gray-700 px-6 py-2 rounded-4xl shadow-md transition-all font-bold hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className={`${showCancelButton ? "w-1/2" : "w-full"} bg-primary text-dark-green px-6 py-2 rounded-4xl shadow-md transition-all font-bold hover:bg-dark-green hover:text-bg`}
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;