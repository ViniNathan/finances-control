import { useState, useCallback, useEffect } from "react";
import { transactionService } from "../services/transactionService";
import { Transaction } from "../types/transaction";

interface DateFilter {
  type: string;
  fromDate: string;
  toDate: string;
  month: string;
  year: string;
}

const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [dateFilter, setDateFilter] = useState<DateFilter | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.getTransactions();
      setTransactions(data);
      if (dateFilter) {
        applyDateFilter(data, dateFilter);
      } else {
        setFilteredTransactions(data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao buscar transações");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dateFilter]);

  const applyDateFilter = useCallback((data: Transaction[], filter: DateFilter) => {
    if (!filter || !filter.fromDate) {
      setFilteredTransactions(data);
      return;
    }
    
    const filtered = data.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      
      if (filter.type === "Daily" && filter.fromDate) {
        const filterDate = new Date(filter.fromDate);
        return (
          transactionDate.getFullYear() === filterDate.getFullYear() &&
          transactionDate.getMonth() === filterDate.getMonth() &&
          transactionDate.getDate() === filterDate.getDate()
        );
      }
      
      if (filter.type === "Weekly" && filter.fromDate && filter.toDate) {
        const fromDate = new Date(filter.fromDate);
        const toDate = new Date(filter.toDate);
        return transactionDate >= fromDate && transactionDate <= toDate;
      }
      
      if (filter.type === "Monthly" && filter.fromDate) {
        const fromDate = new Date(filter.fromDate);
        return (
          transactionDate.getFullYear() === fromDate.getFullYear() &&
          transactionDate.getMonth() === fromDate.getMonth()
        );
      }
      
      return true;
    });
    
    setFilteredTransactions(filtered);
  }, []);

  const updateDateFilter = useCallback((filter: DateFilter) => {
    setDateFilter(filter);
    applyDateFilter(transactions, filter);
  }, [transactions, applyDateFilter]);

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

  const createTransaction = useCallback(async (transaction: Omit<Transaction, "_id" | "createdAt" | "updatedAt">) => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.createTransaction(transaction);
      
      setTransactions(prev => [...prev, data]);
      
      if (dateFilter) {
        applyDateFilter([...transactions, data], dateFilter);
      } else {
        setFilteredTransactions(prev => [...prev, data]);
      }
      
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao criar transação");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [transactions, dateFilter, applyDateFilter]);

  const updateTransaction = useCallback(async (id: string, updatedData: Partial<Transaction>) => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.updateTransaction(id, updatedData);
      
      const updatedTransactions = transactions.map(t => (t._id === id ? data : t));
      setTransactions(updatedTransactions);
      
      if (dateFilter) {
        applyDateFilter(updatedTransactions, dateFilter);
      } else {
        setFilteredTransactions(updatedTransactions);
      }
      
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao atualizar transação");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [transactions, dateFilter, applyDateFilter]);

  const deleteTransaction = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await transactionService.deleteTransaction(id);
      
      const updatedTransactions = transactions.filter(t => t._id !== id);
      setTransactions(updatedTransactions);
      
      if (dateFilter) {
        applyDateFilter(updatedTransactions, dateFilter);
      } else {
        setFilteredTransactions(updatedTransactions);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao deletar transação");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [transactions, dateFilter, applyDateFilter]);

  const deleteAllTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await transactionService.deleteAllTransactions();
      setTransactions([]);
      setFilteredTransactions([]);
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
    transactions: filteredTransactions,
    allTransactions: transactions,
    loading,
    error,
    fetchTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    deleteAllTransactions,
    updateDateFilter
  };
};

export default useTransactions;