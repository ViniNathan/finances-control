import { useState, useEffect } from "react";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/transactions", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

        if (!response.ok) {
          throw new Error("Error fetching transactions");
        }

        const data: Transaction[] = await response.json();
        setTransactions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, loading, error };
};

export default useTransactions;
