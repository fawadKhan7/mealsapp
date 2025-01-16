import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { MealCard } from "./components/meal";
import SelectWeek from "./components/select_week";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState({});
  const [activeTab, setActiveTab] = useState("All meals");
  const [showModal, setShowModal] = useState(false);
  const [mealsToAdd, setMealsToAdd] = useState([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/recipes").then((response) => {
      setRecipes(response.data.recipes);
    });
  }, []);

  const handleMealSelect = (meal) => {
    setMealsToAdd((prev) => {
      if (prev.some((m) => m.id === meal.id)) {
        return prev.filter((m) => m.id !== meal.id);
      }
      return [...prev, meal];
    });
  };

  const addMealToWeek = (meal, week) => {
    setSelectedMeals((prev) => {
      const updatedMeals = { ...prev };
      if (!updatedMeals[week]) {
        updatedMeals[week] = [];
      }
      if (!updatedMeals[week].some((m) => m.id === meal.id)) {
        updatedMeals[week].push(meal);
      }
      return updatedMeals;
    });
  };

  const deleteMealFromWeek = (meal, week) => {
    setSelectedMeals((prev) => {
      const updatedMeals = { ...prev };
      if (updatedMeals[week]) {
        updatedMeals[week] = updatedMeals[week].filter((m) => m.id !== meal.id);
      }
      return updatedMeals;
    });
  };

  const renderMeals = (meals, week) => (
    <div
      className="bg-transparent mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4"
      style={{
        backgroundImage: "linear-gradient(to right, #faf5f0, #faeaf6, #e8f6fa)",
      }}
    >
      {meals.map((meal) => (
        <MealCard
          key={meal.id}
          meal={meal}
          isAllMeal={activeTab === "All Meals"}
          onDelete={week ? () => deleteMealFromWeek(meal, week) : undefined}
          onSelect={() => handleMealSelect(meal)}
          isSelected={mealsToAdd.some((m) => m.id === meal.id)}
        />
      ))}
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#faf5f0] via-[#faeaf6] to-[#e8f6fa] flex flex-col">
      <div
        className="relative text-center bg-cover bg-center h-40 flex flex-col items-center justify-center gap-4"
        style={{
          backgroundImage:
            "url('https://cdn.dummyjson.com/recipe-images/1.webp')",
        }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-50"></div>
        <div className="relative z-10 font-bold text-3xl text-black">
          Optimized your Meal
        </div>
        <div className="relative z-10 text-[11px] text-black">
          Select Meal to Add in Week. You will be able to edit, modify, and
          change the Meal Weeks.
        </div>
      </div>
      <div className="text-center text-xl font-semibold p-4">Week Orders</div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 w-full text-sm bg-white px-4 sm:px-10 lg:px-40">
        {["All Meals", "Week 1", "Week 2", "Week 3", "Week 4"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 w-full ${
              activeTab === tab
                ? "text-black border-b-2 border-[#004370]"
                : "text-black"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <button
          className={`w-full bg-[#004370] text-white py-1 px-3 font-bold text-[10px] ${
            mealsToAdd.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setShowModal(true)}
          disabled={mealsToAdd.length === 0}
        >
          Add To Week
        </button>
      </div>

      <div className="p-4">
        {activeTab === "All Meals" && renderMeals(recipes)}
        {activeTab !== "All Meals" &&
          renderMeals(selectedMeals[activeTab] || [], activeTab)}
      </div>

      {showModal && (
        <SelectWeek
          meals={mealsToAdd}
          onClose={() => setShowModal(false)}
          onAddToWeek={(week) => {
            mealsToAdd.forEach((meal) => addMealToWeek(meal, week));
            setShowModal(false);
            setMealsToAdd([]);
          }}
        />
      )}
    </div>
  );
}

export default App;
