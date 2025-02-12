import { GrHistory} from "react-icons/gr";
import { FaMoneyBillTransfer } from "react-icons/fa6";

interface NavbarProps {
    isAdding: boolean;
    setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar : React.FC<NavbarProps> = ({ isAdding, setIsAdding }) => {
  return (
    <div className="absolute bottom-0 bg-secondary w-screen flex justify-center items-center p-4 rounded-tr-4xl rounded-tl-4xl gap-10 shadow-[0_-5px_10px_rgba(14,62,62,0.3)]">
      <GrHistory 
        className={`size-7 ${!isAdding ? "text-dark-green" : "text-gray-400"} cursor-pointer`}
        onClick={() => setIsAdding(false)}
      />
      <FaMoneyBillTransfer 
        className={`size-7 ${isAdding ? "text-dark-green" : "text-gray-400"} cursor-pointer`}
        onClick={() => setIsAdding(true)}
      />
    </div>
  );
};

export default Navbar;
