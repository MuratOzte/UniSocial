"use client";

import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { TbMessages } from "react-icons/tb";
import Link from "next/link";
import Icons from "./Icons";
import SettingsModal from "../settings/SettingsModal";
import { useDispatch, useSelector } from "react-redux";
import uiSlice from "@/store/Slices/uiSlice";
import Search from "./Search";
import { TbLogout } from "react-icons/tb";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const OpenSettingsModal = () => {
    dispatch(uiSlice.actions.IsSettingsModalOpenedChangeHandler(true));
  };
  const ui = useSelector((state) => state.ui);
  const LogOutButton = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };
  return (
    <nav className="flex items-center justify-between px-12 py-2 bg-main1 shadow-md">
      <div className="flex items-center h-[80px]">
        {ui.IsSettingsModalOpened && <SettingsModal />}
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
      <div>
        <Search />
      </div>
      <div className="flex items-center gap-4">
        <Icons
          onClick={OpenSettingsModal}
          title="Settings"
          icon={<IoSettingsSharp size={20} />}
        />
        <Link href={"/profile"}>
          <Icons title="Account" icon={<FaUserCircle size={20} />} />
        </Link>

        <Icons
          title="LogOut"
          icon={<TbLogout size={20} />}
          onClick={LogOutButton}
        />
      </div>
    </nav>
  );
};

export default Nav;
