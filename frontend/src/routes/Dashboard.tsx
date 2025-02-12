import { useState, useEffect, useRef } from "react";
import Topbar from "../components/Topbar";
import GeneralProperties from "../components/GeneralProperties";
import DateFilter from "../components/DateFilter";

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
        className="absolute bottom-0 w-screen flex justify-center items-start bg-bg rounded-tl-4xl rounded-tr-4xl p-5 overflow-auto"
        style={{ top: `${generalHeight + 64}px` }}
      >
        <DateFilter />
      </div>
    </div>
  );
};

export default Dashboard;
