import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

interface RegisterProps {
    type: string;
    date: string;
    amount: number;
    category: string;
};

const Register: React.FC<RegisterProps> = ({ type, amount, date, category }) => {
  const handleType = (type: string) => {
    if (type === "income") {
      return (
        <div className="flex justify-center items-center h-10 w-10 bg-primary rounded-[100%]">
          <FaArrowTrendUp className="size-5 text-dark-green" />
        </div>
      );
    } else {
      return (
        <div className="flex justify-center items-center h-10 w-10 bg-dark-green rounded-[100%]">
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
    <div className="my-4 py-4 flex flex-row justify-between items-center">
      {handleType(type)}
      <div className="flex flex-col justify-center items-start">
        <div className="text-xs font-bold text-dark-green">{formatDate(date)}</div>
        <div className="text-lg font-semibold capitalize">{type}</div>
        <div className="text-lg text-dark font-bold capitalize">{category}</div>
      </div>
      <div className="text-2xl font-bold">${amount}</div>
    </div>
  );
};

export default Register;
