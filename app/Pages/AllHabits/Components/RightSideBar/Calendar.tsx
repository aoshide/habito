import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { defaultColor, darkModeColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/contextApi";
import { getDateString } from "@/app/utils/allHabitsUtils/DateFunctions";
import dayjs, { Dayjs } from "dayjs";

function Calendar() {
  const { darkModeObject, selectedCurrentDayObject, offsetDayObject } =
    useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  const { selectedCurrentDate, setSelectedCurrentDate } =
    selectedCurrentDayObject;
  const { setOffsetDay } = offsetDayObject;

  const value: Dayjs | null = selectedCurrentDate
    ? dayjs(selectedCurrentDate)
    : null;

  function handleOnChangeDate(newDate: Dayjs) {
    const jsDate = newDate.toDate();
    const currentDate = new Date();
    const differenceInMs = jsDate.getTime() - currentDate.getTime();
    const differenceInDays = differenceInMs / (1000 * 3600 * 24);
    setOffsetDay(Math.floor(differenceInDays + 1));
  }

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.backgroundSlate
          : defaultColor.backgroundSlate,
        maxWidth: "100%", // адаптивность
        overflow: "hidden", // не даем вылезать
        boxSizing: "border-box",
        padding: "20px",
        borderRadius: "12px",
        margin: "20px auto",
      }}
      className="flex flex-col gap-6 justify-center items-center"
    >
      <DateCalendar
        onChange={handleOnChangeDate}
        value={value}
        sx={{
          width: "100%",        // 100% по доступной ширине
          maxWidth: "320px",    // максимальная ширина календаря
          "& .MuiPickersDay-root": {
            color: isDarkMode
              ? darkModeColor.textColor
              : defaultColor.textColor,
            "&.Mui-selected": {
              backgroundColor: defaultColor.default,
              color: "white",
            },
          },
          "& .MuiPickersYear-yearButton": {
            color: isDarkMode
              ? darkModeColor.textColor
              : defaultColor.textColor,
            "&.Mui-selected": {
              backgroundColor: defaultColor.default,
              color: "white",
            },
          },
        }}
      />
    </div>
  );
}

export default Calendar;
