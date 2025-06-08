import React, { useEffect, useState, useCallback } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  calculateStreak,
  calculateTotalPerfectDays,
} from "@/app/Pages/Statistics/Components/StatisticsBoard";
import { defaultColor, darkModeColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/contextApi";
import { getCurrentDayName } from "@/app/utils/allHabitsUtils/DateFunctions";
import { HabitType } from "@/app/Types/GlobalTypes";

function MainStatistics() {
  const {
    darkModeObject,
    allHabitsObject: { allHabits },
    selectedCurrentDayObject: { selectedCurrentDate },
  } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;

  const [statisticsInfo, setStatisticsInfo] = useState([
    { id: 1, num: 0, subTitle: "Total streaks" },
    { id: 2, num: 0, subTitle: "Total Perfect days" },
  ]);

  const [progress, setProgress] = useState<number>(0);

  const calculateThePercentageOfTodaysProgress = useCallback(
    (allHabits: HabitType[]): number => {
      if (allHabits.length === 0 || !selectedCurrentDate) return 0;

      const completedHabitsOfCurrentDate = allHabits.filter((habit) =>
        habit.completedDays.some((day) => day.date === selectedCurrentDate)
      );

      const totalHabitsOfCompletedDays = completedHabitsOfCurrentDate.length;

      const getTwoLetterOfCurrentDay = getCurrentDayName(selectedCurrentDate).slice(0, 2);

      const allHabitsOfCurrentDay = allHabits.filter((habit) =>
        habit.frequency[0].days.some((day) => day === getTwoLetterOfCurrentDay)
      );

      const totalAllHabitsOfCurrentDay = allHabitsOfCurrentDay.length;

      const result = (totalHabitsOfCompletedDays / totalAllHabitsOfCurrentDay) * 100;

      if (isNaN(result) || result === undefined) return 0;

      return result ?? 0;
    },
    [selectedCurrentDate]
  );

  useEffect(() => {
    setProgress(calculateThePercentageOfTodaysProgress(allHabits));
  }, [selectedCurrentDate, allHabits, calculateThePercentageOfTodaysProgress]);

  useEffect(() => {
    const streaks = allHabits.map((habit) => calculateStreak(habit));
    const totalStreak = streaks.reduce((a, b) => a + b, 0);

    const perfectDays = calculateTotalPerfectDays(allHabits);

    setStatisticsInfo([
      { id: 1, num: totalStreak, subTitle: "Total streaks" },
      { id: 2, num: perfectDays, subTitle: "Total Perfect days" },
    ]);
  }, [allHabits]);

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.backgroundSlate
          : defaultColor.backgroundSlate,
        maxWidth: "100%",
        boxSizing: "border-box",
        borderRadius: 12,
        padding: 20,
        margin: "20px auto",
      }}
      className="flex flex-col gap-6 justify-center items-center mx-4 mt-14"
    >
      <span className="font-bold text-xl cursor-pointer hover:text-primary">
        Statistics
      </span>

      {/* Контейнер с фиксированной высотой и шириной в 200 (в 2 раза меньше) */}
      <div
        style={{
          width: "100%",
          maxWidth: 200,
          height: 200,
          position: "relative",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[
                { name: "Completed", value: progress },
                { name: "Remaining", value: 100 - progress },
              ]}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={-180}
              innerRadius={60}
              outerRadius={75}
              dataKey="value"
              stroke="none"
            >
              {[defaultColor.default, "#edf2f4"].map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Центрированный текст прогресса */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <span
            style={{ fontWeight: "bold", fontSize: 24, color: defaultColor.default }}
          >
            {progress.toFixed(0)}%
          </span>
          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
            Current Day&apos;s Progress
          </div>
        </div>
      </div>

      {/* Блок статистики под кругом */}
      <div className="my-4 flex justify-center gap-6 flex-wrap items-center w-full max-w-md">
        {statisticsInfo.map((item) => (
          <div className="flex items-center gap-3" key={item.id}>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="text-[12px]">
              <span className="flex flex-col font-bold">{item.num}</span>
              <span
                style={{
                  color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor50,
                }}
              >
                {item.subTitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainStatistics;
