import { MdKeyboardReturn } from "react-icons/md";
import { useNavigate } from "react-router";

const ReturnButton = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-4 left-4">
        <button 
          onClick={() => navigate("/")} 
          className="flex items-center rounded-3xl"
        >
            <MdKeyboardReturn className="size-9 md:size-10 text-primary border-2 border-primary rounded-lg hover:border-dark-green hover:text-bg hover:bg-dark-green transition-all ease-in-out"/>
        </button>
    </div>
  )
}

export default ReturnButton