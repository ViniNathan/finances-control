import { useState, useEffect } from "react";
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
  
  useEffect(() => {
    generateCalendarDays(currentMonth);
  }, [currentMonth]);

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

  const navigate = (increment: number) => {
    const newDate = new Date(currentMonth);
    if (selected === "Monthly") {
      newDate.setFullYear(newDate.getFullYear() + increment);
    } else if (selected === "Yearly") {
      newDate.setFullYear(newDate.getFullYear() + (increment * 4));
    } else {
      newDate.setMonth(newDate.getMonth() + increment);
    }
    setCurrentMonth(newDate);
  };

  const formatDate = (year: number, month: number, day: number = 1) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    console.log(`Formato de data: ano=${year}, mês=${month} (${month+1}), dia=${day} => ${formattedDate}`);
    return formattedDate;
  };

  const handleSelect = (value: number, type: 'day' | 'month' | 'year') => {
    const selectedYear = currentMonth.getFullYear();
    const selectedMonth = currentMonth.getMonth();
    
    let date;
    if (type === 'day') {
      date = formatDate(selectedYear, selectedMonth, value);
      setSelectedDay(value);
    } else if (type === 'month') {
      date = formatDate(selectedYear, value, 1);
      console.log(`Mês selecionado: ${value + 1}, Data de início: ${date}`);
    } else {
      date = formatDate(value, 0, 1);
    }
    
    setFromDate(date);
    
    if (selected === "Weekly") {
      const startDate = new Date(`${date}T00:00:00`);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      
      setToDate(formatDate(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate()
      ));
    } else if (selected === "Daily") {
      console.log(value);
      setToDate(date);
    } else if (selected === "Monthly") {
      const lastDay = new Date(selectedYear, value + 1, 0).getDate();
      setToDate(formatDate(
        selectedYear,
        value,
        lastDay
      ));
    } else if (selected === "Yearly") {
      setToDate(formatDate(value, 11, 31));
    }
  };

  const isSelected = (value: number, type: 'day' | 'month' | 'year') => {
    if (!fromDate) return false;
    
    const [year, month, day] = fromDate.split('-');
    const date = new Date(`${year}-${month}-${day}T00:00:00`);
    
    if (type === 'day') return value === selectedDay;
    if (type === 'month') return value === date.getMonth();
    return value === date.getFullYear();
  };

  const isInRange = (day: number) => {
    if (!fromDate || !toDate || !day || selected !== "Weekly") return false;
    
    const checkDate = new Date(`${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00`);
    
    const [fromYear, fromMonth, fromDay] = fromDate.split('-');
    const [toYear, toMonth, toDay] = toDate.split('-');
    
    const start = new Date(`${fromYear}-${fromMonth}-${fromDay}T00:00:00`);
    const end = new Date(`${toYear}-${toMonth}-${toDay}T00:00:00`);
    
    return checkDate >= start && checkDate <= end;
  };

  const isToday = (value: number, type: 'day' | 'month' | 'year') => {
    if (!value) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (type === 'day') {
      const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), value);
      selectedDate.setHours(0, 0, 0, 0);
      
      return selectedDate.getDate() === today.getDate() && 
             selectedDate.getMonth() === today.getMonth() && 
             selectedDate.getFullYear() === today.getFullYear();
    } else if (type === 'month') {
      return value === today.getMonth() && 
             currentMonth.getFullYear() === today.getFullYear();
    }
    return value === today.getFullYear();
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from(
    { length: 12 }, 
    (_, i) => currentMonth.getFullYear() - 5 + i
  );

  const renderHeader = () => {
    let title = "";
    if (selected === "Monthly") {
      title = `${currentMonth.getFullYear()}`;
    } else if (selected === "Yearly") {
      const startYear = years[0];
      const endYear = years[years.length - 1];
      title = `${startYear} - ${endYear}`;
    } else {
      title = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
    }

    return (
      <div className="flex justify-between items-center mb-6 px-2">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <IoIosArrowBack size={20} className="text-gray-600" />
        </button>
        
        <h2 className="text-lg font-semibold text-gray-800">
          {title}
        </h2>
        
        <button 
          onClick={() => navigate(1)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <IoIosArrowForward size={20} className="text-gray-600" />
        </button>
      </div>
    );
  };

  const renderCell = (value: number | null, type: 'day' | 'month' | 'year') => {
    if (!value) return <div className="invisible" />;

    const label = type === 'month' ? monthNames[value].substring(0, 3) : value;
    
    return (
      <div 
        onClick={() => handleSelect(value, type)}
        className={`
          h-10 flex items-center justify-center text-sm rounded-lg cursor-pointer
          transition-all duration-200 relative
          ${isToday(value, type) ? 'border-1 border-dark-green' : ''}
          ${isSelected(value, type) 
            ? 'bg-primary text-dark-green font-medium shadow-md' 
            : 'hover:bg-gray-100 text-gray-700'}
          ${isInRange(value as number) && !isSelected(value, type) ? 'bg-secondary' : ''}
        `}
      >
        {label}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      {renderHeader()}
      
      {selected === "Monthly" ? (
        <div className="grid grid-cols-3 gap-2">
          {monthNames.map((_, index) => renderCell(index, 'month'))}
        </div>
      ) : selected === "Yearly" ? (
        <div className="grid grid-cols-3 gap-2">
          {years.map(year => renderCell(year, 'year'))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {weekDays.map((day, index) => (
              <div key={index} className="text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day) => renderCell(day, 'day'))}
          </div>
        </>
      )}
    </div>
  );
};

export default CustomCalendar;