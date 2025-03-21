import React, { useState, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import Topbar from "../components/Topbar";
import GeneralProperties from "../components/GeneralProperties";
import DateFilter from "../components/DateFilter";
import Register from "../components/Register";
import Navbar from "../components/NavBar";
import NewTransaction from "../components/NewTransaction";
import EditTransaction from '../components/EditTransaction';
import useTransactions from "../hooks/useTransactions";

const Dashboard: React.FC = () => {
  const generalRef = useRef<HTMLDivElement>(null);
  const [generalHeight, setGeneralHeight] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);
  const { transactions, fetchTransactions } = useTransactions();

  useEffect(() => {
    if (generalRef.current) {
      setGeneralHeight(generalRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const togglePanel = () => {
    setIsPanelExpanded(!isPanelExpanded);
  };

  const handleEditTransaction = (id: string) => {
    setCurrentEditId(id);
    setIsEditing(true);
    fetchTransactions();
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    fetchTransactions();
  };

  return (
    isEditing ? <EditTransaction transactionId={currentEditId!} onClose={handleCloseEdit} /> :
    <div className="h-[100dvh] w-screen bg-primary flex flex-col">
      <Topbar classname="py-4 px-4 md:px-8" isPanelExpanded={isPanelExpanded} transactions={transactions}/>
      <div ref={generalRef}>
        <GeneralProperties transactions={transactions}/>
      </div>
      <div
        className="absolute bottom-0 w-screen flex flex-col justify-start items-center bg-bg rounded-tl-4xl rounded-tr-4xl p-5 overflow-clip shadow-[0_-5px_10px_rgba(14,62,62,0.3)]"
        style={{ top: isPanelExpanded ? "70px" : `${generalHeight + 64}px` }}
      >
        <button
          onClick={togglePanel}
          className="absolute top-0 left-1/2 transform -translate-x-1/2"
        >
          {isPanelExpanded ? (
            <ChevronDown className="size-10 text-gray-600" />
          ) : (
            <ChevronUp className="size-10 text-gray-600" />
          )}
        </button>
        
        <div className="w-full flex flex-col justify-start items-center mt-5 ">
          {!isAdding ?(
            <>
              <DateFilter />
              <div className="overflow-y-scroll w-full mt-5 relative min-h-[250px] max-h-[35%] md:max-h-[51%] pr-5
                            [&::-webkit-scrollbar]:w-1
                            [&::-webkit-scrollbar-track]:bg-secondary 
                            [&::-webkit-scrollbar-thumb]:bg-primary
                            [&::-webkit-scrollbar-thumb]:rounded-full 
                            [&::-webkit-scrollbar-track]:rounded-full
                            [&::-webkit-scrollbar-thumb:hover]:bg-gray-400">
                {transactions.length === 0 ? (
                  <div className="text-dark-green text-lg font-semibold">No transactions found.</div>
                ) : (
                  [...transactions]
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map((transaction) => (
                      <Register
                        key={transaction._id}
                        id={transaction._id}
                        type={transaction.type}
                        date={transaction.date}
                        amount={transaction.amount}
                        category={transaction.category}
                        onEdit={handleEditTransaction}
                        fetchTransactions={fetchTransactions}
                      />
                    ))
                )}
              </div>
            </>
          ) : (
            <NewTransaction setIsAdding={setIsAdding} fetchTransactions={fetchTransactions} />
          )}
        </div>
      </div>
      <Navbar isAdding={isAdding} setIsAdding={setIsAdding}/>
    </div>
  );
};

export default Dashboard;