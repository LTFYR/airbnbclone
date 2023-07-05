"use client";

import Avatar from "@/app/components/Avatar";
import useCountries from "@/app/hooks/useCountries";
import { ListingInformationProps } from "@/app/interface";
import React from "react";
import Category from "./Category";
import dynamic from "next/dynamic";

const Information: React.FC<ListingInformationProps> = ({
  bathroomCount,
  category,
  description,
  guestCount,
  locationValue,
  roomCount,
  user,
}) => {
  const { getCountryByValue } = useCountries();
  const Map = dynamic(() => import("../Map"), {
    ssr: false,
  });
  const coordinates = getCountryByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <Category
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div className="text-lg text-neutral-500 font-light">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default Information;
