"use client";
import useCountries from "@/app/hooks/useCountries";
import useSearch from "@/app/hooks/useSearch";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const search = useSearch();
  const { getCountryByValue } = useCountries();
  const params = useSearchParams();

  const locationValue = params?.get("locationValue");
  const guestCount = params?.get("guestCount");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");

  const locationVal = useMemo(() => {
    if (locationValue) {
      return getCountryByValue(locationValue as string)?.label;
    }
    return "Anywhere";
  }, [getCountryByValue, locationValue]);

  const dateVal = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      let diftime = differenceInDays(end, start);

      if (diftime === 0) {
        diftime = 1;
      }
      return `${diftime} Days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  const guestsVal = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      onClick={search.onOpen}
      className="border-[1px] border-black/20 w-full md:w-auto rounded-full shadow-sm py-2 hover:shadow-md cursor-pointer transition"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="font-semibold px-6 text-sm">{locationVal}</div>
        <div className="hidden sm:block text-sm px-6 font-semibold border-x-[1px] border-black/20 flex-1 text-center">
          {dateVal}
        </div>
        <div className="text-sm pr-2 px-6 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">{guestsVal}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
