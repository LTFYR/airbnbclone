"use client";

import React, { useEffect } from "react";
import Empty from "./components/Empty";

interface ErrorProps {
  error: Error;
}

const ErrorPage: React.FC<ErrorProps> = ({ error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <Empty title="Aww Error :(" subtitle="Something went wrong. Try again" />
  );
};

export default ErrorPage;
