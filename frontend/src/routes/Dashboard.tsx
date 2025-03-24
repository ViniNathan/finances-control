import React, { useState, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import Topbar from "../components/Topbar";
import GeneralProperties from "../components/GeneralProperties";
import DateFilter from "../components/DateFilter";
import Register from "../components/Register";
import Navbar from "../components/NavBar";
import NewTransaction from "../components/NewTransaction";
import EditTransaction from '../components/EditTransaction';
import Metrics from '../components/Metrics';
import useTransactions from "../hooks/useTransactions";

const Dashboard: React.FC = () => {
  const generalRef = useRef<HTMLDivElement>(null);
  const [generalHeight, setGeneralHeight] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isShowingMetrics, setIsShowingMetrics] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);
  const { transactions, fetchTransactions, updateDateFilter } = useTransactions();

  useEffect(() => {
    if (generalRef.current) {
      setGeneralHeight(generalRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (isShowingMetrics && !isPanelExpanded) {
      setIsPanelExpanded(true);
    }
  }, [isShowingMetrics]);

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

  const handleDateFilterChange = (filterData: {
    type: string;
    fromDate: string;
    toDate: string;
    month: string;
    year: string;
  }) => {
    updateDateFilter(filterData);
  };

  const renderContent = () => {
    if (isShowingMetrics) {
      return (
        <div className="w-full h-full">
          <Metrics 
            transactions={transactions} 
            isPanelExpanded={isPanelExpanded}
          />
        </div>
      );
    }

    if (isAdding) {
      return <NewTransaction setIsAdding={setIsAdding} fetchTransactions={fetchTransactions} />;
    }

    return (
      <>
        <DateFilter onDateFilterChange={handleDateFilterChange} />
        <div className="overflow-y-auto w-full mt-5 relative min-h-[200px] max-h-[calc(100vh-290px)] md:max-h-[calc(100vh-250px)] pr-5
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
    );
  };

  return (
    isEditing ? <EditTransaction transactionId={currentEditId!} onClose={handleCloseEdit} /> :
    <div className="h-[100dvh] w-screen flex flex-col overflow-hidden">
      <div className="bg-primary w-full">
        <Topbar classname="py-4 px-4 md:px-8" isPanelExpanded={isPanelExpanded} transactions={transactions}/>
        {!isPanelExpanded && (
          <div ref={generalRef}>
            <GeneralProperties transactions={transactions}/>
          </div>
        )}
      </div>
      <div 
        className="flex-grow relative bg-bg"
        style={{ height: `calc(100vh - ${isPanelExpanded ? 70 : generalHeight + 64}px - 60px)` }}
      >
        <div
          className="absolute inset-0 flex flex-col justify-start items-center bg-bg p-5 overflow-hidden shadow-[0_-5px_10px_rgba(14,62,62,0.3)]"
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
          
          <div className="w-full h-full flex flex-col justify-start items-center mt-5 overflow-hidden">
            {renderContent()}
          </div>
        </div>
      </div>
      <div className="h-[60px]">
        <Navbar 
          isAdding={isAdding} 
          setIsAdding={setIsAdding}
          isShowingMetrics={isShowingMetrics}
          setIsShowingMetrics={setIsShowingMetrics}
        />
      </div>
    </div>
  );
};

export default Dashboard;