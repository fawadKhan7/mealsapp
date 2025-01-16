import React from "react";
import { CiTrash } from "react-icons/ci";
import { FaStar, FaRegStar } from "react-icons/fa";

export const MealCard = ({
  meal,
  onDelete,
  onSelect,
  isSelected,
  isAllMeal,
}) => {
  return (
    <div
      className={`bg-white border-2 rounded-lg shadow-md p-4 flex flex-col ${
        isSelected ? "border-[#004370]" : "border-transparent"
      }`}
    >
      {" "}
      <div className="relative">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-44 object-cover rounded-md mb-4"
        />
        <div className="absolute px-1 py-2 w-full top-0 flex items-center justify-between">
          {!isAllMeal && (
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-700"
            >
              <CiTrash
                size={28}
                color="red"
                className="bg-red-200 p-1 rounded "
              />
            </button>
          )}
          <span className="bg-black text-white text-xs px-3 rounded-sm ml-auto">
            {meal.mealType[meal.mealType.length - 1]}
          </span>
        </div>
      </div>
      <div className="">
        <h3 className="text-lg font-bold mb-2">{meal.name}</h3>
        <p className="text-gray-600 text-sm mb-2">
          {meal.instructions.join(" ").substring(0, 400)}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-black text-xs ">
          <span className="font-bold">Cuisine:</span>{" "}
          {meal.tags[meal.tags.length - 1]}
        </div>
        <div className="flex items-center">
          <span className="flex text-[#004370] text-sm mr-2">
            {Array.from({ length: 5 }, (_, index) =>
              index < Math.floor(meal.rating) ? (
                <FaStar key={index} />
              ) : (
                <FaRegStar key={index} />
              )
            )}
          </span>
          <span className="text-gray-600 text-sm">({meal.rating})</span>
        </div>
      </div>
    </div>
  );
};
