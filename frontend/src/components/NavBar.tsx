import { GrHistory, GrMoney } from "react-icons/gr";

const Navbar = () => {
  return (
    <div className="absolute bottom-0 bg-secondary w-screen flex justify-center items-center p-4 rounded-tr-4xl rounded-tl-4xl gap-10">
        <GrHistory className="size-7 text-dark-green" />
        <GrMoney className="size-7 text-dark-green" />
    </div>
  )
}

export default Navbar