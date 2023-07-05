"use client";

import { ReserevationProps } from "@/app/interface";
import React from "react";
import Calendar from "../Input/Calendar";
import CustomButton from "../CustomButton";

const ReservListing: React.FC<ReserevationProps> = ({
  changeDate,
  dateRange,
  onSubmit,
  price,
  reservedDates,
  totalPrice,
  disabled,
}) => {
  return (
    <div className="rounded-xl border[1px] border-neutral-200 bg-white overflow-hidden">
      <div className="flex flex-row items-center p-4 gap-1">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="text-neutral-600 font-light">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        reservedDates={reservedDates}
        changeDate={(value) => changeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <CustomButton disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <hr />
      <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ReservListing;
