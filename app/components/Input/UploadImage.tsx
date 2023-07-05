"use client";

import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
import { CloudinaryImageProps } from "@/app/interface";
import { useCallback } from "react";

declare global {
  var cloudinary: any;
}

const UploadImage: React.FC<CloudinaryImageProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="ynbydytu"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 border-neutral-300 p-20 flex flex-col items-center justify-center gap-4 text-neutral-400"
            onClick={() => open?.()}
          >
            <TbPhotoPlus size={48} />
            <div className="font-semibold text-lg">Click to upload image</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={value}
                  fill
                  alt="Uploaded image"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadImage;
