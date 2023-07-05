"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import ModalHeading from "../ModalHeading";
import Input from "../Input/Input";
import { toast } from "react-hot-toast";
import CustomButton from "../CustomButton";
import useLogin from "@/app/hooks/useLogin";
import useRegister from "@/app/hooks/useRegister";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const loginModal = useLogin();
  const registerModal = useRegister();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const enter = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ModalHeading title="Welcome back!" subtitle="Login to your account" />
      <Input
        id="email"
        label="Email"
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
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 mt-4 text-center font-light">
        <div className="flex flex-row justify-center items-center gap-4">
          <div>Don't you have an account?</div>
          <div
            onClick={enter}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false }).then((e) => {
      setIsLoading(false);

      if (e?.ok) {
        toast.success("Welcome back. You succesfully logged in!");
        router.refresh();
        loginModal.onClose();

        if (e?.error) {
          toast.error(e.error);
        }
      }
    });
  };

  return (
    <Modal
      label="Continue"
      onSubmit={handleSubmit(onSubmit)}
      onClose={loginModal.onClose}
      disabled={isLoading}
      isExpanded={loginModal.isExpanded}
      title="Login"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
