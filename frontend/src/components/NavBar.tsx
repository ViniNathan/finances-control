import { GrHistory} from "react-icons/gr";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";

interface NavbarProps {
    isAdding: boolean;
    setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
    isShowingMetrics: boolean;
    setIsShowingMetrics: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar : React.FC<NavbarProps> = ({ isAdding, setIsAdding, isShowingMetrics, setIsShowingMetrics }) => {
  return (
    <div className="absolute bottom-0 bg-secondary w-screen flex justify-center items-center p-4 rounded-tr-4xl rounded-tl-4xl gap-10 shadow-[0_-5px_10px_rgba(14,62,62,0.3)]">
      <GrHistory 
        className={`size-7 ${!isAdding && !isShowingMetrics ? "text-dark-green" : "text-gray-400"} cursor-pointer`}
        onClick={() => {
          setIsAdding(false);
          setIsShowingMetrics(false);
        }}
      />
      <FaMoneyBillTransfer 
        className={`size-7 ${isAdding ? "text-dark-green" : "text-gray-400"} cursor-pointer`}
        onClick={() => {
          setIsAdding(true);
          setIsShowingMetrics(false);
        }}
      />
      <IoStatsChart
        className={`size-7 ${isShowingMetrics ? "text-dark-green" : "text-gray-400"} cursor-pointer`}
        onClick={() => {
          setIsShowingMetrics(true);
          setIsAdding(false);
        }}
      />
    </div>
  );
};

export default Navbar;
