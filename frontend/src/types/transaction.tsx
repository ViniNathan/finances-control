export interface Transaction {
    _id: string;
    type: 'income' | 'expense';
    date: string;
    amount: number;
    category: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  }