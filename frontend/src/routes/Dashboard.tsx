import { useState, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import Topbar from "../components/Topbar";
import GeneralProperties from "../components/GeneralProperties";
import DateFilter from "../components/DateFilter";
import Register from "../components/Register";
import Navbar from "../components/NavBar";
import NewTransaction from "../components/NewTransaction";

const Dashboard = () => {
  const generalRef = useRef<HTMLDivElement>(null);
  const [generalHeight, setGeneralHeight] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  useEffect(() => {
    if (generalRef.current) {
      setGeneralHeight(generalRef.current.clientHeight);
    }
  }, []);

  const togglePanel = () => {
    setIsPanelExpanded(!isPanelExpanded);
  };

  return (
    <div className="min-h-screen w-screen bg-primary flex flex-col">
      <Topbar classname="py-4 px-4 md:px-8" isPanelExpanded={isPanelExpanded}/>
      <div ref={generalRef}>
        <GeneralProperties />
      </div>
      <div
        className="absolute bottom-0 w-screen flex flex-col justify-start items-center bg-bg rounded-tl-4xl rounded-tr-4xl p-5 overflow-auto shadow-[0_-5px_10px_rgba(14,62,62,0.3)]"
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
          {!isAdding ? (
            <>
              <DateFilter />
              <div className="overflow-hidden w-full mt-5">
                <Register type="Income" date="12/02/2025" amount={3000} category="Salary" />
                <Register type="Income" date="12/02/2025" amount={1000} category="Rent" />
                <Register type="Expense" date="12/02/2025" amount={1100} category="Food" />
              </div>
            </>
          ) : (
            <NewTransaction setIsAdding={setIsAdding} />
          )}
        </div>
      </div>
      <Navbar isAdding={isAdding} setIsAdding={setIsAdding}/>
    </div>
  );
};

export default Dashboard;