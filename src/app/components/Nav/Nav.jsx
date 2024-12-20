"use client";

import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { TbMessages } from "react-icons/tb";
import Link from "next/link";
import Icons from "./Icons";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between px-12 py-2 bg-[#191a1f] shadow-md">
      <div className="flex items-center h-[80px]">
        <Link href={"/feed"}>
          <Image
            src={require("@/assets/logo/logo.png")}
            alt="UniSocial"
            width={200}
            height={80}
            className="object-cover object-center"
          />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href={"/messages"}>
          <Icons title="Messages" icon={<TbMessages size={20} />} />
        </Link>
        <Icons title="Settings" icon={<IoSettingsSharp size={20} />} />
        <Link href={"/profile"}>
          <Icons title="Account" icon={<FaUserCircle size={20} />} />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
