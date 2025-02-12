import { GiTakeMyMoney, GiReceiveMoney, GiPayMoney } from "react-icons/gi";

const GeneralProperties = () => {
  return (
    <div className="h-max flex flex-row justify-center items-center gap-6 my-10
                    md:gap-10 md:mt-15">
        <div className="flex flex-col justify-center items-center gap-1">
            <GiTakeMyMoney className="size-7 md:size-10"/>
            <div className="text-dark font-semibold text-xs md:text-lg">Total Balance</div>
            <div className="text-bg font-bold text-2xl">$ 0.00</div>
        </div>
        <div className="h-20 w-[0.1px] bg-bg"></div>
        <div className="flex flex-col justify-center items-center gap-1">
            <GiReceiveMoney className="size-7 md:size-10"/>
            <div className="text-dark font-semibold text-xs md:text-lg">Income</div>
            <div className="text-bg font-bold text-2xl">$ 0.00</div>
        </div>
        <div className="h-20 w-[0.1px] bg-bg"></div>
        <div className="flex flex-col justify-center items-center gap-1">
            <GiPayMoney className="size-7 md:size-10"/>
            <div className="text-dark font-semibold text-xs md:text-lg">Expense</div>
            <div className="text-bg font-bold text-2xl">$ 0.00</div>
        </div>
    </div>
  )
}

export default GeneralProperties