"use client";
import { IoMdClose } from "react-icons/io";
import React, { useCallback, useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import { ModalProps } from "@/app/interface";

const Modal: React.FC<ModalProps> = ({
  title,
  isExpanded,
  onClose,
  onSubmit,
  body,
  footer,
  label,
  secondaryAction,
  secondaryLabel,
  disabled,
}) => {
  const [show, setShow] = useState(isExpanded);

  useEffect(() => {
    setShow(isExpanded);
  }, [isExpanded]);

  const handleCloseModal = useCallback(() => {
    if (disabled) {
      return;
    }
    setShow(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleOnSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const onSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isExpanded) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none bg-neutral-800/70 z-50">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 mx-auto h-full my-6 lg:h-auto md:h-auto">
          <div
            className={`translate duartion-300 h-full ${
              show ? "translate-y-0" : "translate-y-full"
            } ${show ? "opacity-100" : "opacity-0"} `}
          >
            <div className="h-full lg:h-auto md:h-auto translate border-0 rounded-lg shadow-lg flex flex-col w-full relative bg-white outline-none focus:outline-none">
              <div className="flex items-center relative border-b-[1px] rounded-t p-6 justify-center">
                <button
                  className="border-0 p-1 hover:opacity-70 absolute transition left-9"
                  onClick={handleCloseModal}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              <div className="relative p-6 flex-auto">{body}</div>
              <div className="flex flex-col gap-2 p-6">
                <div className="w-full flex gap-4 flex-row items-center">
                  {secondaryLabel && secondaryAction && (
                    <CustomButton
                      outline
                      disabled={disabled}
                      label={secondaryLabel}
                      onClick={secondaryAction}
                    />
                  )}
                  <CustomButton
                    disabled={disabled}
                    label={label}
                    onClick={handleOnSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
