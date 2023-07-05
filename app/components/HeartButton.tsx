"use client";
import React from "react";
import { HeartButtonProps } from "../interface";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavourite from "../hooks/useFavourite";

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  logedInUser,
}) => {
  const { isAddedFavorites, handleFavorite } = useFavourite({
    listingId,
    logedInUser,
  });
  return (
    <div
      onClick={handleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={isAddedFavorites ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
