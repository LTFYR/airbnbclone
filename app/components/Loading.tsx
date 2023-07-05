"use client";

import { RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      <RingLoader size={100} color="#F43F5E" />
    </div>
  );
};

export default Loading;
