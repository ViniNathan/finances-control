import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface CalendarProps {
  selected: string;
  fromDate: string;
  setFromDate: (date: string) => void;
  toDate: string;
  setToDate: (date: string) => void;
}

const CustomCalendar = ({ selected, fromDate, setFromDate, toDate, setToDate }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [calendarDays, setCalendarDays] = useState<(number | null)[]>([]);
  
  // Initialize the calendar days when the component mounts
  useEffect(() => {
    generateCalendarDays(currentMonth);
  }, [currentMonth]);

  // Generate the days for the current month
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();
    const days: (number | null)[] = [];
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    setCalendarDays(days);
  };

  const nextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };

  const prevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

    const handleDaySelect = (day: number) => {
    if (!day) return;
    
    setSelectedDay(day);
    
    const selectedYear = currentMonth.getFullYear();
    const selectedMonth = currentMonth.getMonth();
    
    const selectedDate = formatDate(selectedYear, selectedMonth, day);
    setFromDate(selectedDate);
    
    if (selected === "Weekly") {
      const endDate = new Date(selectedYear, selectedMonth, day + 7);
      setToDate(formatDate(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate()
      ));
    } else {
        setToDate('');
    }
  };

  const isInRange = (day: number) => {
    if (!fromDate || !toDate || !day || selected !== "Weekly") return false;
    
    const currentYear = currentMonth.getFullYear();
    const currentMonthNum = currentMonth.getMonth();
    const checkDate = new Date(currentYear, currentMonthNum, day);
    
    const start = new Date(fromDate);
    const end = new Date(toDate);
    
    return checkDate >= start && checkDate <= end;
  };

  const isToday = (day: number) => {
    if (!day) return false;
    
    const today = new Date();
    return day === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear();
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 12 }, (_, i) => i + 2018).reverse();

  return (
    <>
      {selected === "Monthly" ? 
        <div className="grid grid-cols-3 grid-rows-4 bg-bg">
            {monthNames.map((month, index) => (
                <motion.div 
                key={index} 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex justify-center items-center h-10 text-center text-sm font-medium border-1 border-secondary text-dark cursor-pointer"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), index, 1))}
                >
                {month}
                </motion.div>
            ))}
        </div>
      : selected === "Yearly" ? 
      <div className="grid grid-cols-3 grid-rows-4 bg-bg">
        {years.map((month, index) => (
            <motion.div 
            key={index} 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex justify-center items-center h-10 text-center text-sm font-medium border-1 border-secondary text-dark cursor-pointer"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), index, 1))}
            >
            {month}
            </motion.div>
        ))}
    </div>
      : (
        <div className="bg-bg rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={prevMonth}
              className="p-1 rounded-full hover:bg-primary"
            >
              <IoIosArrowBack size={20} className="text-dark-green" />
            </button>
            
            <h2 className="text-lg font-semibold text-dark-green">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            
            <button 
              onClick={nextMonth}
              className="p-1 rounded-full hover:bg-primary"
            >
              <IoIosArrowForward size={20} className="text-dark-green" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, index) => (
              <div key={index} className="text-center text-sm font-medium text-dark">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <div 
                key={index} 
                onClick={() => day && handleDaySelect(day)}
                className={`
                  h-10 flex items-center justify-center text-sm rounded-full cursor-pointer
                  transition-all duration-200 relative
                  ${!day ? 'invisible' : ''}
                  ${isToday(day as number) ? 'border border-dark-green' : ''}
                  ${day === selectedDay ? 'bg-primary text-dark-green font-bold' : 'hover:bg-secondary'}
                  ${isInRange(day as number) && day !== selectedDay ? 'bg-primary/30' : ''}
                `}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
  
};

export default CustomCalendar;