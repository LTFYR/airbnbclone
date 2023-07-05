"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CategoryProps } from "../interface";
import { useCallback } from "react";
import querystring from "query-string";

export const Category: React.FC<CategoryProps> = ({
  icon: Icon,
  selected,
  label,
}) => {
  const router = useRouter();

  const params = useSearchParams();

  const handleCategory = useCallback(() => {
    let customQuery = {};

    if (params) {
      customQuery = querystring.parse(params.toString());
    }

    const newQuery: any = {
      ...customQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete newQuery.category;
    }

    const url = querystring.stringifyUrl(
      {
        url: "/",
        query: newQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, router, params]);
  return (
    <div
      onClick={handleCategory}
      className={`flex flex-col items-center border-b-2 p-3 gap-2 justify-center hover:text-neutral-800 transition cursor-pointer ${
        selected ? "border-b-neutral-800" : "border-transparent"
      } ${selected ? "text-neutral-800" : "text-neutral-500"}`}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};
