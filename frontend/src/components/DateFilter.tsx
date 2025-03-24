import { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import CustomCalendar from "./CustomCalendar";

interface DateFilterProps {
  onDateFilterChange: (filterData: {
    type: string;
    fromDate: string;
    toDate: string;
    month: string;
    year: string;
  }) => void;
}

const DateFilter = ({ onDateFilterChange }: DateFilterProps) => {
  const options = ["Daily", "Weekly", "Monthly"];
  const [selected, setSelected] = useState("Daily");
  const [openModal, setOpenModal] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [_showCalendar, setShowCalendar] = useState(false);
  const [filterActive, setFilterActive] = useState(false);

  const handleSection = (value: string) => {
    setSelected(value);
    setOpenModal(true);
    setShowCalendar(value === "Daily" || value === "Weekly" || value === "Monthly");
  };

  const renderDateSelector = () => {
    switch (selected) {
      default:
        return (
          <CustomCalendar 
          selected={selected}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
        />
        );
    }
  };

  const handleApply = () => {
    const filterData = { 
      type: selected,
      fromDate,
      toDate,
      month,
      year
    };
    
    console.log(filterData);
    onDateFilterChange(filterData);
    setFilterActive(!!fromDate);
    setOpenModal(false);
    setShowCalendar(false);
  };

  const clearFilter = () => {
    setFromDate("");
    setToDate("");
    setMonth("");
    setYear("");
    setFilterActive(false);
    
    onDateFilterChange({
      type: selected,
      fromDate: "",
      toDate: "",
      month: "",
      year: ""
    });
  };

  const formatDisplayDate = () => {
    if (!fromDate) return null;
    
    const formatDate = (dateString: string) => {
      const [year, month, day] = dateString.split('-');
      return new Date(`${year}-${month}-${day}T00:00:00`).toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: '2-digit' 
      });
    };
    
    if (selected === 'Daily') {
      return formatDate(fromDate);
    } else if (selected === 'Weekly') {
      return `${formatDate(fromDate)} - ${formatDate(toDate)}`;
    } else if (selected === 'Monthly') {
      const [year, month] = fromDate.split('-');
      const date = new Date(`${year}-${month}-01T00:00:00`);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    
    return null;
  };

  return (
    <>
      <div className="sticky top-0 flex flex-col items-center w-full">
        <div className="w-max h-max py-1 px-1 bg-secondary rounded-4xl flex flex-row justify-center items-center gap-3 z-2
                      md:py-2 md:px-3 md:gap-5">
          {options.map((value) => (
            <div
              key={value}
              className="relative text-dark-green text-sm font-semibold py-3 px-4 cursor-pointer rounded-3xl
                        md:text-lg"
              onClick={() => handleSection(value)}
            >
              {selected === value && (
                <motion.div
                  layoutId="underline"
                  className="absolute inset-1 bg-primary rounded-3xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                />
              )}
              <span className="relative z-10">{value}</span>
            </div>
          ))}
        </div>
        
        {filterActive && (
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-dark-green bg-secondary px-3 py-1 rounded-full">
            <FaFilter className="text-primary" />
            <span>{formatDisplayDate()}</span>
            <button 
              onClick={clearFilter}
              className="ml-1 text-dark hover:text-dark-green"
            >
              <IoMdClose size={16} />
            </button>
          </div>
        )}
      </div>
      
      {openModal && (
        <div className="fixed inset-0 bg-dark flex items-center justify-center z-50">
          <motion.div 
            className="bg-secondary w-11/12 md:w-3/4 lg:w-1/3 rounded-3xl p-5 shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-row justify-between items-center border-b border-dark pb-3">
              <h1 className="text-dark-green text-xl font-semibold">{selected} Filter</h1>
              <button
                onClick={() => {
                  setOpenModal(false);
                  setShowCalendar(false);
                }}
                className="text-dark-green hover:text-dark transition-colors duration-200"
              >
                <IoMdClose size={24} />
              </button>
            </div>
            
            {renderDateSelector()}
            
            <div className="flex gap-3 mt-5">
              <button 
                onClick={() => {
                  setOpenModal(false);
                  setShowCalendar(false);
                }}
                className="bg-dark-green text-white text-lg font-semibold rounded-3xl p-2 flex-1 shadow-md"
              >
                Cancel
              </button>
              <button 
                onClick={handleApply}
                className="bg-primary text-dark-green text-lg font-semibold rounded-3xl p-2 flex-1 hover:bg-primary-dark transition-colors duration-200 shadow-md"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default DateFilter;