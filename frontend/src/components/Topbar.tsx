import { IoIosLogOut } from "react-icons/io";

interface TopbarProps {
  username?: string;
  classname?: string;
}

const Topbar: React.FC<TopbarProps> = ({ username = "Username", classname }) => {
  return (
    <div className={`flex justify-between items-center ${classname}`}>
      <div className="flex flex-col justify-center items-start">
        <div className="text-dark-green text-lg font-bold">Hi, Welcome back</div>
        <div className="text-dark-green text-sm">{username}</div>
      </div>
      <IoIosLogOut className="size-7 cursor-pointer" />
    </div>
  );
};

export default Topbar;