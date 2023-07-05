"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import ModalHeading from "../ModalHeading";
import Input from "../Input/Input";
import { toast } from "react-hot-toast";
import CustomButton from "../CustomButton";
import useLogin from "@/app/hooks/useLogin";
import useRegister from "@/app/hooks/useRegister";
import { useRouter, useSearchParams } from "next/navigation";
import useSearch from "@/app/hooks/useSearch";
import { SEARCHSTEPS } from "@/app/enum/enum";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import { CountrySelectProps } from "@/app/interface";
import { CountryValue } from "@/app/types";
import qs from "query-string";
import { formatISO } from "date-fns";
import LocationSelect from "../select/LocationSelect";
import Calendar from "../Input/Calendar";
import Counter from "../Input/Counter";

const SearchModal = () => {
  const search = useSearch();
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(SEARCHSTEPS.LOCATION);
  const [location, setLocation] = useState<CountryValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const moveBack = useCallback(() => {
    setStep((val) => val - 1);
  }, []);

  const moveForward = useCallback(() => {
    setStep((val) => val + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== SEARCHSTEPS.INFO) {
      return moveForward();
    }

    let query = {};

    if (params) {
      query = qs.parse(params.toString());
    }

    const newQuery: any = {
      ...query,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      newQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      newQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: newQuery,
      },
      { skipNull: true }
    );
    setStep(SEARCHSTEPS.LOCATION);

    search.onClose();
    router.push(url);
  }, [
    step,
    search,
    location,
    router,
    guestCount,
    bathroomCount,
    moveForward,
    dateRange,
    roomCount,
    params,
  ]);

  const label = useMemo(() => {
    if (step === SEARCHSTEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryLabel = useMemo(() => {
    if (step === SEARCHSTEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let body = (
    <div className="flex flex-col gap-8">
      <ModalHeading
        title="Where do you want to go?"
        subtitle="Search and find perfect places!"
      />
      <LocationSelect
        value={location}
        onChange={(val) => setLocation(val as CountryValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === SEARCHSTEPS.DATE) {
    body = (
      <div className="flex flex-col gap-8">
        <ModalHeading
          title="Time plan"
          subtitle="Make sure everything is free!"
        />
        <Calendar
          value={dateRange}
          changeDate={(val) => setDateRange(val.selection)}
        />
      </div>
    );
  }

  if (step === SEARCHSTEPS.INFO) {
    body = (
      <div className="flex flex-col gap-8">
        <ModalHeading
          title="Information about location"
          subtitle="Find perfect places"
        />
        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(val) => setGuestCount(val)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you search?"
          value={roomCount}
          onChange={(val) => setRoomCount(val)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms in place?"
          value={bathroomCount}
          onChange={(val) => setBathroomCount(val)}
        />
      </div>
    );
  }

  return (
    <Modal
      title="Filters"
      label={label}
      isExpanded={search.isExpanded}
      onClose={search.onClose}
      onSubmit={onSubmit}
      secondaryLabel={secondaryLabel}
      secondaryAction={step === SEARCHSTEPS.LOCATION ? undefined : moveBack}
      body={body}
    />
  );
};

export default SearchModal;
