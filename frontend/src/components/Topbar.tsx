import { IoIosLogOut } from "react-icons/io";
import { GiTakeMyMoney, GiReceiveMoney, GiPayMoney } from "react-icons/gi";

interface TopbarProps {
  username?: string;
  classname?: string;
  isPanelExpanded: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ username = "Username", classname, isPanelExpanded }) => {
  const handlePanel = () => {
  if (isPanelExpanded) {
    return (
      <div className="flex flex-row justify-center items-center gap-6">
          <div className="hidden md:flex">
            <div className="flex flex-row justify-center items-center gap-1">
                <GiTakeMyMoney className="size-8"/>
                <div className="text-bg font-bold text-sm">$ 0.00</div>
            </div>
            <div className="flex flex-row justify-center items-center gap-1">
                <GiReceiveMoney className="size-8"/>
                <div className="text-bg font-bold text-sm">$ 0.00</div>
            </div>
            <div className="flex flex-row justify-center items-center gap-1">
                <GiPayMoney className="size-8"/>
                <div className="text-bg font-bold text-sm">$ 0.00</div>
            </div>
          </div>
          <IoIosLogOut className="size-7 cursor-pointer" />
      </div>
    );
  } else{
    return (<IoIosLogOut className="size-7 cursor-pointer" />);
  }
  };

  return (
    <div className={`flex justify-between items-center ${classname}`}>
      <div className="flex flex-col justify-center items-start">
        <div className="text-dark-green text-lg font-bold">Hi, Welcome back</div>
        <div className="text-dark-green text-sm">{username}</div>
      </div>
      {handlePanel()}
    </div>
  );
};

export default Topbar;