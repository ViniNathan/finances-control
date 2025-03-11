import React from 'react';
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import useTransactions  from '../hooks/useTransactions';

interface RegisterProps {
    type: string;
    date: string;
    amount: number;
    category: string;
    id: string;
    onEdit: (id: string) => void;
    fetchTransactions: () => void;
};

const Register: React.FC<RegisterProps> = ({ type, amount, date, category, id, onEdit, fetchTransactions}) => {
  const { deleteTransaction } = useTransactions();

  const handleDelete = async () => {
    try {
      await deleteTransaction(id);
      fetchTransactions();
    } catch (err: any) {
      console.error(err);
    }
  }

  const handleType = (type: string) => {
    if (type === "income") {
      return (
        <div className="flex justify-center items-center h-10 w-10 bg-primary rounded-full shrink-0">
          <FaArrowTrendUp className="size-5 text-dark-green" />
        </div>
      );
    } else {
      return (
        <div className="flex justify-center items-center h-10 w-10 bg-dark-green rounded-full shrink-0">
          <FaArrowTrendDown className="size-5 text-bg" />
        </div>
      );
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(dateString));
  };

  return (
    <div className="relative my-4 py-4 flex flex-row justify-between items-center gap-4">
      <button className="absolute top-3 right-0 text-dark hover:text-red-500" onClick={handleDelete}>
        <RiDeleteBinFill />
      </button>
      <button className="absolute top-3 right-6 text-dark hover:text-primary" onClick={() => onEdit(id)}>
        <MdOutlineModeEdit />
      </button>
      {handleType(type)}
      <div className="flex flex-col justify-center items-start min-w-32 max-w-48 flex-1">
        <div className="text-xs font-bold text-dark-green w-full truncate">
          {formatDate(date)}
        </div>
        <div className="text-lg font-semibold capitalize w-full truncate">
          {type}
        </div>
        <div className="text-lg text-dark font-bold capitalize w-full truncate">
          {category}
        </div>
      </div>
      <div className="text-2xl font-bold min-w-24 text-right">
        ${amount.toLocaleString()}
      </div>
    </div>
  );
};

export default Register;