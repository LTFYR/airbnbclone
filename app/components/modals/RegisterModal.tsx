"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useRegister from "@/app/hooks/useRegister";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import ModalHeading from "../ModalHeading";
import Input from "../Input/Input";
import { toast } from "react-hot-toast";
import CustomButton from "../CustomButton";
import { signIn } from "next-auth/react";
import useLogin from "@/app/hooks/useLogin";

const RegisterModal = () => {
  const registerModal = useRegister();
  const loginModal = useLogin();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const enter = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const handleGithub = () => {
    signIn("github");
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registered succesfully");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => toast.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ModalHeading title="Welcome to Airbnb" subtitle="Create an account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <CustomButton
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <CustomButton
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={handleGithub}
      />
      <div className="text-neutral-500 mt-4 text-center font-light">
        <div className="flex flex-row justify-center items-center gap-4">
          <div>Already have an account?</div>
          <div
            onClick={enter}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isExpanded={registerModal.isExpanded}
      title="Register"
      label="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
