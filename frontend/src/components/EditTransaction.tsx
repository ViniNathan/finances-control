import React, { useState, useEffect } from 'react';
import useTransactions from '../hooks/useTransactions';
import TransactionForm from './TransactionForm';

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
        
        <TransactionForm
          transactionType={type}
          setTransactionType={setType}
          category={category}
          setCategory={setCategory}
          amount={amount}
          setAmount={setAmount}
          date={date}
          setDate={setDate}
          description={description}
          setDescription={setDescription}
          onSubmit={handleSubmit}
          submitButtonText="Save"
          showCancelButton={true}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};

export default EditTransaction;