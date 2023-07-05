"use client";
import useCountries from "@/app/hooks/useCountries";
import { ListingHeadingProps } from "@/app/interface";
import React from "react";
import ModalHeading from "../ModalHeading";
import Image from "next/image";
import HeartButton from "../HeartButton";

const ListingHeading: React.FC<ListingHeadingProps> = ({
  id,
  imageSrc,
  locationValue,
  title,
  logedInUser,
}) => {
  const { getCountryByValue } = useCountries();
  const location = getCountryByValue(locationValue);

  return (
    <>
      <ModalHeading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] rounded-xl relative overflow-hidden">
        <Image
          src={imageSrc}
          fill
          alt="Listing image"
          className="w-full object-cover"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} logedInUser={logedInUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHeading;
