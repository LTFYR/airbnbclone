"use client";

import React from "react";
import { EmptyStateProps } from "../interface";
import { useRouter } from "next/navigation";
import ModalHeading from "./ModalHeading";
import CustomButton from "./CustomButton";

const Empty: React.FC<EmptyStateProps> = ({
  title = "Nothing found",
  subtitle = "Try change or remove some of your filters",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col justify-center items-center gap-2">
      <ModalHeading title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <CustomButton
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default Empty;
