"use client";

import React from "react";
import { ButtonProps } from "../interface";

const CustomButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  icon: Icon,
  little,
  outline,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 rounded-lg w-full transition ${
        outline ? "bg-white" : "bg-rose-500"
      } ${outline ? "border-black" : "border-rose-500"} ${
        outline ? "text-black" : "text-white"
      } ${little ? "py-1" : "py-3"} ${little ? "text-sm" : "text-md"} ${
        little ? "font-light" : "font-semibold"
      } ${little ? "border-[1px]" : "border-2"}`}
    >
      {Icon && <Icon className="absolute top-3 left-4" size={24} />}
      {label}
    </button>
  );
};

export default CustomButton;
