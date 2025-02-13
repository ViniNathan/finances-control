import api from "./api";

interface Transaction {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description?: string;
  date: string;
  createdAt: string;
}

export const transactionService = {
  async getTransactions(): Promise<Transaction[]> {
    const response = await api.get<Transaction[]>("/api/transactions");
    return response.data;
  },

  async getTransactionById(id: string): Promise<Transaction> {
    const response = await api.get<Transaction>(`/api/transactions/${id}`);
    return response.data;
  },

  async createTransaction(transaction: Omit<Transaction, "_id" | "createdAt">): Promise<Transaction> {
    const response = await api.post<Transaction>("/api/transactions", transaction);
    return response.data;
  },

  async updateTransaction(id: string, updatedData: Partial<Transaction>): Promise<Transaction> {
    const response = await api.put<Transaction>(`/api/transactions/${id}`, updatedData);
    return response.data;
  },

  async deleteTransaction(id: string): Promise<void> {
    await api.delete(`/api/transactions/${id}`);
  },

  async deleteAllTransactions(): Promise<void> {
    await api.delete("/api/transactions/all");
  }

  
};
