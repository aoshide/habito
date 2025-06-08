import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { useGlobalContextProvider } from "@/app/contextApi";
import {
  getCurrentDayName,
  getDateString,
  getFormattedDate,
} from "@/app/utils/allHabitsUtils/DateFunctions";

export default function HabitsContainerTop() {
  const { habitWindowObject, selectedCurrentDayObject, offsetDayObject } =
    useGlobalContextProvider();
  const { setOpenHabitWindow } = habitWindowObject;
  const { selectedCurrentDate, setSelectedCurrentDate } =
    selectedCurrentDayObject;
  const { offsetDay, setOffsetDay } = offsetDayObject;

  type Option = "next" | "prev";
  function updateDate(option: Option) {
    if (option === "next") {
      setOffsetDay((prev) => prev + 1);
    }
    if (option === "prev") {
      setOffsetDay((prev) => prev - 1);
    }
  }

  useEffect(() => {
    setSelectedCurrentDate(getDateString(new Date(), offsetDay));
  }, [offsetDay, setSelectedCurrentDate]);

  return (
    <div className="p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center w-full sm:w-auto">
        <div className="min-w-[120px]">
          <h2 className="font-bold text-lg truncate">
            {getCurrentDayName(selectedCurrentDate)}
          </h2>
          <span className="font-light text-xs text-gray-600 dark:text-gray-400">
            {getFormattedDate(selectedCurrentDate)}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => updateDate("prev")}
            aria-label="Previous day"
            className="text-primary hover:text-primary-dark transition"
          >
            <ArrowCircleLeftOutlinedIcon fontSize="medium" />
          </button>
          <button
            onClick={() => updateDate("next")}
            aria-label="Next day"
            className="text-primary hover:text-primary-dark transition"
          >
            <ArrowCircleRightOutlinedIcon fontSize="medium" />
          </button>
        </div>
      </div>

      <button
        onClick={() => setOpenHabitWindow(true)}
        className="flex gap-2 items-center bg-primary hover:bg-primary-dark transition text-white rounded-md py-2 px-4 text-sm sm:text-base whitespace-nowrap"
        type="button"
      >
        <FontAwesomeIcon icon={faPlus} />
        <span className="hidden xs:inline">New Habit</span>
      </button>
    </div>
  );
}
