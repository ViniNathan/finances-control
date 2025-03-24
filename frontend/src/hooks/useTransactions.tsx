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

interface CategoryValueFilter {
  categories: string[];
  minAmount: number | null;
  maxAmount: number | null;
}

const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [dateFilter, setDateFilter] = useState<DateFilter | null>(null);
  const [categoryValueFilter, setCategoryValueFilter] = useState<CategoryValueFilter | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.getTransactions();
      setTransactions(data);
      
      // Aplicar filtros se existirem
      let filtered = [...data];
      
      if (dateFilter && dateFilter.fromDate) {
        filtered = applyDateFilter(filtered, dateFilter);
      }
      
      if (categoryValueFilter) {
        filtered = applyCategoryValueFilter(filtered, categoryValueFilter);
      }
      
      setFilteredTransactions(filtered);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao buscar transações");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dateFilter, categoryValueFilter]);

  const applyDateFilter = useCallback((data: Transaction[], filter: DateFilter) => {
    if (!filter || !filter.fromDate) {
      return data;
    }
    
    return data.filter(transaction => {
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
        const [filterYear, filterMonth] = filter.fromDate.split('-');
        const filterMonthNumber = parseInt(filterMonth, 10) - 1; 
        
        return (
          transactionDate.getFullYear() === parseInt(filterYear, 10) &&
          transactionDate.getMonth() === filterMonthNumber
        );
      }
      
      return true;
    });
  }, []);

  const applyCategoryValueFilter = useCallback((data: Transaction[], filter: CategoryValueFilter) => {
    if (!filter) {
      return data;
    }
    
    return data.filter(transaction => {
      // Filtro por categoria
      if (filter.categories.length > 0 && !filter.categories.includes(transaction.category)) {
        return false;
      }
      
      // Filtro por valor mínimo
      if (filter.minAmount !== null && transaction.amount < filter.minAmount) {
        return false;
      }
      
      // Filtro por valor máximo
      if (filter.maxAmount !== null && transaction.amount > filter.maxAmount) {
        return false;
      }
      
      return true;
    });
  }, []);

  const updateDateFilter = useCallback((filter: DateFilter) => {
    setDateFilter(filter);
    
    let filtered = [...transactions];
    
    if (filter.fromDate) {
      filtered = applyDateFilter(filtered, filter);
    }
    
    if (categoryValueFilter) {
      filtered = applyCategoryValueFilter(filtered, categoryValueFilter);
    }
    
    setFilteredTransactions(filtered);
  }, [transactions, applyDateFilter, categoryValueFilter, applyCategoryValueFilter]);

  const updateCategoryValueFilter = useCallback((filter: CategoryValueFilter) => {
    setCategoryValueFilter(filter);
    
    let filtered = [...transactions];
    
    if (dateFilter && dateFilter.fromDate) {
      filtered = applyDateFilter(filtered, dateFilter);
    }
    
    filtered = applyCategoryValueFilter(filtered, filter);
    
    setFilteredTransactions(filtered);
  }, [transactions, dateFilter, applyDateFilter, applyCategoryValueFilter]);

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
      
      const updatedTransactions = [...transactions, data];
      setTransactions(updatedTransactions);
      
      // Aplicar filtros aos dados atualizados
      let filtered = [...updatedTransactions];
      
      if (dateFilter && dateFilter.fromDate) {
        filtered = applyDateFilter(filtered, dateFilter);
      }
      
      if (categoryValueFilter) {
        filtered = applyCategoryValueFilter(filtered, categoryValueFilter);
      }
      
      setFilteredTransactions(filtered);
      
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao criar transação");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [transactions, dateFilter, categoryValueFilter, applyDateFilter, applyCategoryValueFilter]);

  const updateTransaction = useCallback(async (id: string, updatedData: Partial<Transaction>) => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.updateTransaction(id, updatedData);
      
      const updatedTransactions = transactions.map(t => (t._id === id ? data : t));
      setTransactions(updatedTransactions);
      
      // Aplicar filtros aos dados atualizados
      let filtered = [...updatedTransactions];
      
      if (dateFilter && dateFilter.fromDate) {
        filtered = applyDateFilter(filtered, dateFilter);
      }
      
      if (categoryValueFilter) {
        filtered = applyCategoryValueFilter(filtered, categoryValueFilter);
      }
      
      setFilteredTransactions(filtered);
      
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao atualizar transação");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [transactions, dateFilter, categoryValueFilter, applyDateFilter, applyCategoryValueFilter]);

  const deleteTransaction = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await transactionService.deleteTransaction(id);
      
      const updatedTransactions = transactions.filter(t => t._id !== id);
      setTransactions(updatedTransactions);
      
      // Aplicar filtros aos dados atualizados
      let filtered = [...updatedTransactions];
      
      if (dateFilter && dateFilter.fromDate) {
        filtered = applyDateFilter(filtered, dateFilter);
      }
      
      if (categoryValueFilter) {
        filtered = applyCategoryValueFilter(filtered, categoryValueFilter);
      }
      
      setFilteredTransactions(filtered);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao deletar transação");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [transactions, dateFilter, categoryValueFilter, applyDateFilter, applyCategoryValueFilter]);

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
    updateDateFilter,
    updateCategoryValueFilter
  };
};

export default useTransactions;