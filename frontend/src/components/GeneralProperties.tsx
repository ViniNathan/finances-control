import { useEffect, useState } from 'react';
import { GiTakeMyMoney, GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { transactionService } from '../services/transactionService';

const GeneralProperties = () => {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const fetchTransactions = async () => {
    try {
      const transactions = await transactionService.getTransactions();
      
      const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
        
      const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
        
      setIncome(totalIncome);
      setExpense(totalExpense);
      setBalance(totalIncome - totalExpense);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();

    const intervalId = setInterval(() => {
      fetchTransactions();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatCurrency = (value: number) => {
    return `$ ${value.toFixed(2)}`;
  };

  return (
    <div className="h-max flex flex-row justify-center items-center gap-4 my-10 md:gap-10 md:mt-15">
      <div className="flex flex-col justify-center items-center gap-1">
        <GiTakeMyMoney className="size-7 md:size-10"/>
        <div className="text-dark font-semibold text-md md:text-lg">Total Balance</div>
        <div className="text-bg font-bold text-lg md:text-2xl">{formatCurrency(balance)}</div>
      </div>
      <div className="h-20 w-[0.1px] bg-bg"></div>
      <div className="flex flex-col justify-center items-center gap-1">
        <GiReceiveMoney className="size-7 md:size-10"/>
        <div className="text-dark font-semibold text-md md:text-lg">Income</div>
        <div className="text-bg font-bold text-lg md:text-2xl">{formatCurrency(income)}</div>
      </div>
      <div className="h-20 w-[0.1px] bg-bg"></div>
      <div className="flex flex-col justify-center items-center gap-1">
        <GiPayMoney className="size-7 md:size-10"/>
        <div className="text-dark font-semibold text-md md:text-lg">Expense</div>
        <div className="text-bg font-bold text-lg md:text-2xl">{formatCurrency(expense)}</div>
      </div>
    </div>
  );
};

export default GeneralProperties;