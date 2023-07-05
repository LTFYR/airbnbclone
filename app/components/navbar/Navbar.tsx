"use client";
import { NavbarProps } from "@/app/interface";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import User from "./User";
import Categories from "./Categories";

const Navbar: React.FC<NavbarProps> = ({ loggedInUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center gap-3 justify-between md:gap-0">
            <Logo />
            <Search />
            <User loggedInUser={loggedInUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
