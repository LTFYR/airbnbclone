"use client";
import Image from "next/image";
import { AvatarProps } from "../interface";

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      src={src || "/images/user.png"}
      height="30"
      width="30"
      alt="user profile"
      className="rounded-full"
    />
  );
};

export default Avatar;
