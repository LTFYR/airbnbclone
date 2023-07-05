"use client";
import { InputProps } from "@/app/interface";
import React from "react";
import { BiDollar } from "react-icons/bi";

const Input: React.FC<InputProps> = ({
  errors,
  id,
  label,
  register,
  disabled,
  formatPrice,
  required,
  type,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          className="absolute top-5 left-2 text-neutral-700"
          size={24}
        />
      )}
      <input
        className={`bg-white peer w-full p-4 pt-6 font-light border-2 rounded-md outline-none tranition disabled:opacity-70 disabled:cursor-not-allowed ${
          formatPrice ? "pl-9" : "pl-4"
        }
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
      />
      <label
        className={`absolute duration-150 text-md transform -translate-y-3 top-5 z-10 origin-[0] ${
          formatPrice ? "left-9" : "left-4"
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
        ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
