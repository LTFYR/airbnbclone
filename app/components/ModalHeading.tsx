"use client";
import React from "react";
import { ModalHeadingProps } from "../interface";

const ModalHeading: React.FC<ModalHeadingProps> = ({
  title,
  center,
  subtitle,
}) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="font-light mt-2 text-neutral-500">{subtitle}</div>
    </div>
  );
};

export default ModalHeading;
