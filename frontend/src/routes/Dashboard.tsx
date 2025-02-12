import { useState, useEffect, useRef } from "react";
import Topbar from "../components/Topbar";
import GeneralProperties from "../components/GeneralProperties";
import DateFilter from "../components/DateFilter";
import Register from "../components/Register";
import Navbar from "../components/Navbar";


const Dashboard = () => {
  const generalRef = useRef<HTMLDivElement>(null);
  const [generalHeight, setGeneralHeight] = useState(0);

  useEffect(() => {
    if (generalRef.current) {
      setGeneralHeight(generalRef.current.clientHeight);
    }
  }, []);

  return (
    <div className="min-h-screen w-screen bg-primary flex flex-col">
      <Topbar classname="py-4 px-4 md:px-8" />
      <div ref={generalRef}>
        <GeneralProperties />
      </div>
      <div
        className=" absolute bottom-0 w-screen flex justify-center items-start bg-bg rounded-tl-4xl rounded-tr-4xl p-5 overflow-auto shadow-[0_-5px_10px_rgba(14,62,62,0.3)]"
        style={{ top: `${generalHeight + 64}px` }}
      >
        <div className="w-screen flex flex-col justify-start items-center">
          <DateFilter />
          <div className="overflow-hidden w-full mt-5">
          <Register type="Income" date="12/02/2025" amount={3000} category="Salary"/>
          <Register type="Income" date="12/02/2025" amount={1000} category="Rent"/>
          <Register type="Expense" date="12/02/2025"  amount={1100} category="Food"/>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Dashboard;
