"use client";
import { CategorySelectProps } from "@/app/interface";
import React from "react";

const CategorySelect: React.FC<CategorySelectProps> = ({
  icon: Icon,
  label,
  onClick,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl p-4 flex flex-col gap-3 border-2 hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      }`}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategorySelect;
