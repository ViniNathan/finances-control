import { useState } from "react";
import { motion } from "framer-motion";

const DateFilter = () => {
  const options = ["Daily", "Weekly", "Monthly", "Yearly"];
  const [selected, setSelected] = useState("Daily");

  return (
    <div className="sticky top-0 w-max h-max py-1 px-1 bg-secondary rounded-4xl flex flex-row justify-center items-center gap-3 z-200
                    md:py-2 md:px-3 md:gap-5">
      {options.map((value) => (
        <div
          key={value}
          className="relative text-dark-green text-sm font-semibold py-3 px-4 cursor-pointer rounded-3xl
                    md:text-lg"
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
