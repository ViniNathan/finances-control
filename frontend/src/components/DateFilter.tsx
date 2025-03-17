import { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import CustomCalendar from "./CustomCalendar";

const DateFilter = () => {
  const options = ["Daily", "Weekly", "Monthly"];
  const [selected, setSelected] = useState("Daily");
  const [openModal, setOpenModal] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [month, _setMonth] = useState("");
  const [year, _setYear] = useState("");
  const [_showCalendar, setShowCalendar] = useState(false);

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
    console.log({ 
      type: selected,
      fromDate,
      toDate,
      month,
      year
    });
    setOpenModal(false);
    setShowCalendar(false);
  };

  return (
    <>
      <div className="sticky top-0 w-max h-max py-1 px-1 bg-secondary rounded-4xl flex flex-row justify-center items-center gap-3 z-2
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