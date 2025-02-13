import { useState, useCallback, useEffect } from "react";
import { transactionService } from "../services/transactionService";

interface Transaction {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description?: string;
  date: string;
  createdAt: string;
}

const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.getTransactions();
      setTransactions(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao buscar transações");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTransactionById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      return await transactionService.getTransactionById(id);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao buscar transação");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createTransaction = useCallback(async (transaction: Omit<Transaction, "_id" | "createdAt">) => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.createTransaction(transaction);
      setTransactions(prev => [...prev, data]);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao criar transação");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTransaction = useCallback(async (id: string, updatedData: Partial<Transaction>) => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.updateTransaction(id, updatedData);
      setTransactions(prev => prev.map(t => (t._id === id ? data : t)));
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao atualizar transação");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTransaction = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await transactionService.deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao deletar transação");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAllTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await transactionService.deleteAllTransactions();
      setTransactions([]);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao deletar todas as transações");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    deleteAllTransactions,
  };
};

export default useTransactions;
