import { useEffect, useState } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { GiTakeMyMoney, GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { useNavigate } from "react-router";
import { transactionService } from '../services/transactionService';

interface TopbarProps {
  username?: string;
  classname?: string;
  isPanelExpanded: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ username = "Username", classname, isPanelExpanded }) => {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    navigate("/login"); // Redirect to login page
  };

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

  const handlePanel = () => {
    if (isPanelExpanded) {
      return (
        <div className="flex flex-row justify-center items-center gap-6">
          <div className="hidden md:flex md:gap-6">
            <div className="flex flex-row justify-center items-center gap-1">
              <GiTakeMyMoney className="size-8" />
              <div className="text-bg font-bold text-sm">{formatCurrency(balance)}</div>
            </div>
            <div className="flex flex-row justify-center items-center gap-1">
              <GiReceiveMoney className="size-8" />
              <div className="text-bg font-bold text-sm">{formatCurrency(income)}</div>
            </div>
            <div className="flex flex-row justify-center items-center gap-1">
              <GiPayMoney className="size-8" />
              <div className="text-bg font-bold text-sm">{formatCurrency(expense)}</div>
            </div>
          </div>
          <IoIosLogOut className="size-7 cursor-pointer" onClick={handleLogout} />
        </div>
      );
    } else {
      return <IoIosLogOut className="size-7 cursor-pointer" onClick={handleLogout} />;
    }
  };

  return (
    <div className={`flex justify-between items-center ${classname}`}>
      <div className="flex flex-col justify-center items-start">
        <div className="text-dark-green text-lg font-bold">Hi, Welcome back</div>
        <div className="text-dark-green text-sm">{username}</div>
      </div>
      {handlePanel()}
    </div>
  );
};

export default Topbar;
