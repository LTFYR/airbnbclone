"use client";

import React from "react";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  changeDate: (val: RangeKeyDict) => void;
  reservedDates?: Date[];
  value: Range;
}

const Calendar: React.FC<CalendarProps> = ({
  changeDate,
  value,
  reservedDates,
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={changeDate}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={reservedDates}
    />
  );
};

export default Calendar;
