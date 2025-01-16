import React, { useState } from "react";

const SelectWeek = ({ meals, onClose, onAddToWeek }) => {
  const [selectedMeal, setSelectedMeal] = useState(null); 

  const handleMealClick = (meal) => {
    setSelectedMeal(meal); 
  };

  const handleSave = () => {
    meals.forEach((meal) => onAddToWeek(selectedMeal, meal));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white flex flex-col items-center gap-4 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <p className="text-lg font-semibold">Select Week</p>
        <div className="flex items-center gap-4">
          {["Week 1", "Week 2", "Week 3", "Week 4"].map((week) => (
            <div
              key={week}
              className={`px-4 py-2 rounded-md cursor-pointer ${
                selectedMeal === week ? "bg-[#cfecff]" : "bg-[#f2f2f2]"
              }`}
              onClick={() => handleMealClick(week)} 
            >
              {week}
            </div>
          ))}
        </div>
        <button
          className="bg-[#004370] text-white py-2 px-6 font-bold text-sm rounded-md"
          onClick={handleSave} 
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SelectWeek;
