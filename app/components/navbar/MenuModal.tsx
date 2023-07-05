"use client";

import { MenuModalProps } from "@/app/interface";

const MenuModal: React.FC<MenuModalProps> = ({ onClick, label }) => {
  return (
    <div
      className="px-4 py-3 hover:bg-neutral-100 font-semibold transition"
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default MenuModal;
