import React from "react";
import { useGlobalContextProvider } from "@/app/contextApi";
import StatisticsHabitCard from "./StatisticsHabitCard";
import { darkModeColor } from "@/colors";
import { HabitType } from "@/app/Types/GlobalTypes"; 

function StatisticsHabitArea() {
  const {
    allHabitsObject: { allHabits },
    darkModeObject: { isDarkMode },
  } = useGlobalContextProvider();


  const habits: HabitType[] = allHabits;

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.background : "white",
      }}
      className="p-4 mt-4 rounded-md"
    >
      {habits.map((habit, index) => (
        <div key={index}>
          <StatisticsHabitCard habit={habit} />
        </div>
      ))}
    </div>
  );
}

export default StatisticsHabitArea;
