import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { MdOutlineClose, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiCurrencyFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { IoIosMenu } from "react-icons/io";
import { auth } from "../libs/firebaseConfig";
import useStore from "../store";
import ThemeSwitch from "./switch";
import TransitionWrapper from "./wrappers/transition-wrapper";

const links = [
  { label: "Dashboard", link: "/overview" },
  { label: "Transactions", link: "/transactions" },
  { label: "Accounts", link: "/accounts" },
  { label: "Settings", link: "/settings" },
];

const UserMenu = () => {
  const { user, setCredentails } = useStore((state) => state);
  const navigate = useNavigate();

  const handleSingout = async () => {
    if (user.provider === "google") {
      await handleSocialLogout();
    }
    localStorage.removeItem("user");
    setCredentails(null);
    navigate("/sign-in");
  };

  const handleSocialLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <Menu as="div" className="relative z-50">
      <div>
        <MenuButton className="">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 text-white rounded-full cursor-pointer 2xl:w-12 2xl:h-12 bg-violet-600">
              <p className="text-2xl font-bold">{user?.firstname?.charAt(0)}</p>
            </div>
            {/* <div className="hidden text-left md:block">
              <p className="text-lg font-medium text-black dark:text-gray-400">
                {user?.firstname}
              </p>
              <span className="text-sm text-gray-700 dark:text-gray-500">
                {user?.email}
              </span>
            </div> */}
            <MdOutlineKeyboardArrowDown className="hidden text-2xl text-gray-600 cursor-pointer md:block dark:text-gray-300" />
          </div>
        </MenuButton>
      </div>

      <TransitionWrapper>
        <MenuItems className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-slate-800 ring-1 ring-black/5 focus:outline-none">
          <div className="p-2 md:p-5">
            <div className="flex w-full gap-3 mb-5">
              <div className="flex items-center justify-center text-white rounded-full cursor-pointer min-w-10 size-10 2xl:size-12 bg-violet-500">
                <p className="text-2xl font-bold">
                  {user?.firstname?.charAt(0)}
                </p>
              </div>

              <div className="w-full">
                <p className="text-violet-700">{user?.firstname}</p>
                <span className="text-xs overflow-ellipsis">
                  {user?.country}
                </span>
              </div>
            </div>
            <MenuItem>
              {({ active }) => (
                <Link to="/settings">
                  <button
                    className={`text-gray-900 dark:text-gray-300 mb-4 flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Profile
                  </button>
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {() => (
                <button
                  onClick={handleSingout}
                  className={`bg-red-700/15 text-red-600 dark:bg-red-600 dark:text-white flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Sign Out
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </TransitionWrapper>
    </Menu>
  );
};

const MobileSidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="">
      <Popover className="">
        {({ open }) => (
          <>
            <PopoverButton
              className={`
               flex md:hidden items-center rounded-md font-medium focus:outline-none text-gray-600 dark:text-gray-400`}
            >
              {open ? <MdOutlineClose size={26} /> : <IoIosMenu size={26} />}
            </PopoverButton>
            <TransitionWrapper>
              <PopoverPanel className="absolute z-50 w-screen max-w-sm px-4 py-6 mt-3 transform -translate-x-1/2 bg-white left-1/2 dark:bg-slate-800">
                <div className="flex flex-col space-y-2">
                  {links.map(({ label, link }, index) => (
                    <Link to={link} key={index}>
                      <PopoverButton
                        className={`${
                          link === path
                            ? "bg-black dark:bg-slate-900 text-white"
                            : "text-gray-700 dark:text-gray-500"
                        } w-1/2 px-6 py-2 rounded-full text-left`}
                      >
                        {label}
                      </PopoverButton>
                    </Link>
                  ))}

                  <div className="flex items-center justify-between px-4 py-6">
                    <PopoverButton>
                      <ThemeSwitch />
                    </PopoverButton>
                    <UserMenu />
                  </div>
                </div>
              </PopoverPanel>
            </TransitionWrapper>
          </>
        )}
      </Popover>
    </div>
  );
};

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex items-center justify-between w-full py-6">
      <Link to="/">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-violet-700 rounded-xl">
            <RiCurrencyFill className="text-3xl text-white hover:animate-spin" />
          </div>
          <span className="text-xl font-bold text-black dark:text-white">
            My-Finance
          </span>
        </div>
      </Link>

      <div className="items-center hidden gap-4 md:flex">
        {links.map(({ label, link }, index) => (
          <div
            key={index}
            className={`${
              link === path
                ? "bg-black dark:bg-slate-800 text-white"
                : "text-gray-700 dark:text-gray-500"
            } px-6 py-2 rounded-full`}
          >
            <Link to={link}>{label}</Link>
          </div>
        ))}
      </div>

      <div className="items-center hidden gap-10 md:flex 2xl:gap-20">
        <ThemeSwitch />

        <UserMenu />
      </div>

      <div className="flex md:hidden">
        <MobileSidebar />
      </div>
    </div>
  );
};

export default Navbar;
