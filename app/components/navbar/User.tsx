"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuModal from "./MenuModal";
import useRegister from "@/app/hooks/useRegister";
import useLogin from "@/app/hooks/useLogin";
import { UserProps } from "@/app/interface";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import useRent from "@/app/hooks/useRent";
import { useRouter } from "next/navigation";

const User: React.FC<UserProps> = ({ loggedInUser }) => {
  const register = useRegister();
  const login = useLogin();
  const rent = useRent();
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const router = useRouter();

  const handleRent = useCallback(() => {
    if (!loggedInUser) {
      toast.error("You have to login firstly");
      return login.onOpen();
    }

    rent.onOpen();
  }, [loggedInUser, login, rent]);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm py-4 px-4 rounded-full font-semibold hover:bg-neutral-100 cursor-pointer transition"
          onClick={handleRent}
        >
          Airbnb your home
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-black/20 border-neutral-200 cursor-pointer rounded-full flex flex-row gap-3 items-center hover:shadow-md transition"
          onClick={handleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={loggedInUser?.image} />
          </div>
        </div>
      </div>
      {open && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 top-12 right-0 text-sm overflow-hidden bg-white">
          <div className="flex flex-col cursor-pointer">
            {loggedInUser ? (
              <>
                <MenuModal
                  onClick={() => router.push("/trips")}
                  label="My trips"
                />
                <MenuModal
                  onClick={() => router.push("/properties")}
                  label="My properties"
                />
                <MenuModal
                  onClick={() => router.push("/reservations")}
                  label="My reservations"
                />
                <MenuModal
                  onClick={() => router.push("favorites")}
                  label="My favorites"
                />
                <MenuModal onClick={rent.onOpen} label="Airbnb my home" />
                <hr />
                <MenuModal onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuModal onClick={login.onOpen} label="Login" />
                <MenuModal onClick={register.onOpen} label="Register" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
