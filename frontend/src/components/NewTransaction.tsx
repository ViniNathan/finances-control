import { useState } from "react";
import useTransactions from "../hooks/useTransactions";
import TransactionForm from "./TransactionForm";
import { useAuth } from "../hooks/useAuth";

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

  const handleAddTransaction = async (e: React.FormEvent) => {
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
      
      <TransactionForm
        transactionType={transactionType}
        setTransactionType={setTransactionType}
        category={category}
        setCategory={setCategory}
        amount={amount}
        setAmount={setAmount}
        date={date}
        setDate={setDate}
        description={description}
        setDescription={setDescription}
        onSubmit={handleAddTransaction}
        submitButtonText="Add"
      />
    </div>
  );
};

export default NewTransaction;