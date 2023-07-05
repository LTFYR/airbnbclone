"use client";

import { CounterProps } from "@/app/interface";
import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Counter: React.FC<CounterProps> = ({
  subtitle,
  title,
  value,
  onChange,
}) => {
  const handleIncrease = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const handleDecrease = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={handleDecrease}
          className="flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-neutral-400 text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlineMinus />
        </div>
        <div className="text-xl text-neutral-600 font-light">{value}</div>
        <div
          onClick={handleIncrease}
          className="flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-neutral-400 text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
