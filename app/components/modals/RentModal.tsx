"use client";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useRent from "@/app/hooks/useRent";
import { STEPS } from "@/app/enum/enum";
import ModalHeading from "../ModalHeading";
import { categories } from "@/app/utils/categories";
import CategorySelect from "../select/CategorySelect";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import LocationSelect from "../select/LocationSelect";
import dynamic from "next/dynamic";
import Counter from "../Input/Counter";
import UploadImage from "../Input/UploadImage";
import Input from "../Input/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RentModal() {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const rentModal = useRent();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      price: 1,
      imageSrc: "",
      guestCount: 1,
      bathroomCount: 1,
      roomCount: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const setNewValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleBack = () => {
    setStep((val) => val - 1);
  };

  const handleNext = () => {
    setStep((val) => val + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return handleNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Property is created");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const label = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryAction = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  let body = (
    <div className="flex flex-col gap-8">
      <ModalHeading
        title="Which of these best describes your place ?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 max-h-[50vh] gap-3 overflow-y-auto">
        {categories.map((categ) => (
          <div key={categ.label} className="col-span-1">
            <CategorySelect
              selected={category === categ.label}
              onClick={(category) => setNewValue("category", category)}
              label={categ.label}
              icon={categ.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    body = (
      <div className="flex flex-col gap-8">
        <ModalHeading
          title="Where is your place located?"
          subtitle="Help users to find you"
        />
        <LocationSelect
          value={location}
          onChange={(value) => setNewValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    body = (
      <div className="flex flex-col gap-8">
        <ModalHeading
          title="Share information about your destination"
          subtitle="What amenities do you have ?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests you accept?"
          value={guestCount}
          onChange={(value) => setNewValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms exsist in your place?"
          value={roomCount}
          onChange={(value) => setNewValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have ?"
          value={bathroomCount}
          onChange={(value) => setNewValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    body = (
      <div className="flex flex-col gap-8">
        <ModalHeading
          title="Add a photo of your place"
          subtitle="Show to guests how your place looks like!"
        />
        <UploadImage
          onChange={(value) => setNewValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    body = (
      <div className="flex flex-col gap-8">
        <ModalHeading
          title="Describe your place"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    body = (
      <div className="flex flex-col gap-8">
        <ModalHeading
          title="Set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice={true}
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title="Airbnb your home"
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryLabel={secondaryAction}
      secondaryAction={step === STEPS.CATEGORY ? undefined : handleBack}
      label={label}
      isExpanded={rentModal.isExpanded}
      body={body}
    />
  );
}
