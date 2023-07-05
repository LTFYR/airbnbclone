"use client";

import useCountries from "@/app/hooks/useCountries";
import { CountrySelectProps } from "@/app/interface";
import { CountryValue } from "@/app/types";
import React from "react";
import Select from "react-select";

const LocationSelect: React.FC<CountrySelectProps> = ({ onChange, value }) => {
  const { allCountries } = useCountries();
  return (
    <Select
      placeholder="Anywhere"
      isClearable
      options={allCountries()}
      value={value}
      onChange={(value) => onChange(value as CountryValue)}
      formatOptionLabel={(option: any) => (
        <div key={option.label} className="flex flex-row items-center gap-3">
          <div>{option.flag}</div>
          <div>{option.label}</div>,
          <span className="ml-1 text-neutral-500">{option.region}</span>
        </div>
      )}
      classNames={{
        control: () => "p-3 border-2",
        input: () => "text-lg",
        option: () => "text-lg",
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: "black",
          primary25: "#ffe4e6",
        },
      })}
    />
  );
};

export default LocationSelect;
