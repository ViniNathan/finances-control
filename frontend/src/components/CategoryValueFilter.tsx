import { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { Transaction } from "../types/transaction";

interface CategoryValueFilterProps {
  transactions: Transaction[];
  onFilterChange: (filters: {
    categories: string[];
    minAmount: number | null;
    maxAmount: number | null;
  }) => void;
}

const CategoryValueFilter = ({ transactions, onFilterChange }: CategoryValueFilterProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [minAmount, setMinAmount] = useState<string>("");
  const [maxAmount, setMaxAmount] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filterActive, setFilterActive] = useState(false);

  const uniqueCategories = [...new Set(transactions.map(t => t.category))];
  
  const handleApply = () => {
    const filters = {
      categories: selectedCategories,
      minAmount: minAmount ? parseFloat(minAmount) : null,
      maxAmount: maxAmount ? parseFloat(maxAmount) : null
    };
    
    onFilterChange(filters);
    setFilterActive(selectedCategories.length > 0 || !!minAmount || !!maxAmount);
    setOpenModal(false);
  };
  
  const clearFilter = () => {
    setMinAmount("");
    setMaxAmount("");
    setSelectedCategories([]);
    setFilterActive(false);
    
    onFilterChange({
      categories: [],
      minAmount: null,
      maxAmount: null
    });
  };
  
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const formatDisplayFilter = () => {
    const parts = [];
    
    if (selectedCategories.length > 0) {
      parts.push(selectedCategories.length === 1 
        ? `${selectedCategories[0]}` 
        : `${selectedCategories.length} categories`
      );
    }
    
    if (minAmount && maxAmount) {
      parts.push(`$ ${minAmount}-${maxAmount}`);
    } else if (minAmount) {
      parts.push(`> $ ${minAmount}`);
    } else if (maxAmount) {
      parts.push(`< $ ${maxAmount}`);
    }
    
    return parts.join(", ");
  };
  
  return (
    <>
      <div className="flex flex-col items-center w-full mt-3 mb-1">
        <button
          onClick={() => setOpenModal(true)}
          className="py-2 px-4 bg-secondary text-dark-green rounded-full flex items-center gap-2 hover:bg-primary transition-colors duration-200"
        >
          <FaFilter />
          <span className="font-medium">Advanced filter</span>
        </button>
        
        {filterActive && (
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-dark-green bg-secondary px-3 py-1 rounded-full">
            <FaFilter className="text-primary" />
            <span>{formatDisplayFilter()}</span>
            <button 
              onClick={clearFilter}
              className="ml-1 text-dark hover:text-dark-green"
            >
              <IoMdClose size={16} />
            </button>
          </div>
        )}
      </div>
      
      {openModal && (
        <div className="fixed inset-0 bg-dark flex items-center justify-center z-50">
          <motion.div 
            className="bg-secondary w-11/12 md:w-3/4 lg:w-1/3 rounded-3xl p-5 shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-row justify-between items-center border-b border-dark pb-3">
              <h1 className="text-dark-green text-xl font-semibold">Filter by category/value</h1>
              <button
                onClick={() => setOpenModal(false)}
                className="text-dark-green hover:text-dark transition-colors duration-200"
              >
                <IoMdClose size={24} />
              </button>
            </div>
            
            <div className="mt-4">
              <h2 className="text-dark-green text-lg font-medium mb-2">Categories</h2>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2
                           [&::-webkit-scrollbar]:w-1
                           [&::-webkit-scrollbar-track]:bg-secondary 
                           [&::-webkit-scrollbar-thumb]:bg-primary
                           [&::-webkit-scrollbar-thumb]:rounded-full 
                           [&::-webkit-scrollbar-track]:rounded-full">
                {uniqueCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all
                      ${selectedCategories.includes(category) 
                        ? "bg-primary text-dark-green" 
                        : "bg-bg text-dark-green"}`}
                  >
                    {category}
                  </button>
                ))}
                {uniqueCategories.length === 0 && (
                  <p className="text-gray-500 italic">No category available</p>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <h2 className="text-dark-green text-lg font-medium mb-2">Value range</h2>
              <div className="flex gap-3 items-center">
                <div className="flex flex-col w-1/2">
                  <label className="text-sm text-dark-green ml-3 mb-1">Min. value</label>
                  <input
                    type="number"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    className="w-full bg-bg p-3 rounded-3xl text-sm text-dark-green
                              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0,00"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="text-sm text-dark-green ml-3 mb-1">Max. value</label>
                  <input
                    type="number"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    className="w-full bg-bg p-3 rounded-3xl text-sm text-dark-green
                              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0,00"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-5">
              <button 
                onClick={() => setOpenModal(false)}
                className="bg-dark-green text-white text-lg font-semibold rounded-3xl p-2 flex-1 shadow-md"
              >
                Cancel
              </button>
              <button 
                onClick={handleApply}
                className="bg-primary text-dark-green text-lg font-semibold rounded-3xl p-2 flex-1 hover:bg-primary-dark transition-colors duration-200 shadow-md"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default CategoryValueFilter; 