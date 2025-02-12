import { useState } from "react";
import { motion } from "framer-motion";

const DateFilter = () => {
  const options = ["Daily", "Weekly", "Monthly"];
  const [selected, setSelected] = useState("Daily");

  return (
    <div className="relative w-max h-max py-2 px-6 bg-secondary rounded-3xl flex flex-row justify-center items-center gap-5">
      {options.map((value) => (
        <div
          key={value}
          className="relative text-dark-green text-lg font-semibold py-3 px-4 cursor-pointer rounded-3xl"
          onClick={() => setSelected(value)}
        >
          {selected === value && (
            <motion.div
              layoutId="underline"
              className="absolute inset-1 bg-primary rounded-3xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            />
          )}
          <span className="relative z-10">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default DateFilter;
