import { Menu } from "@headlessui/react";
import React from "react";
import { IoFilterSharp, IoSearchOutline } from "react-icons/io5";
import TransitionWrapper from "./wrappers/transition-wrapper";

const SearchBox = () => {
  return (
    <div className='flex items-center gap-4 md:gap-10 2xl:gap-20'>
      <div className='w-full flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-2'>
        <IoSearchOutline className='text-xl text-gray-600 dark:text-gray-500' />
        <input
          type='text'
          placeholder='Search now...'
          className='outline-none group bg-transparent text-gray-700 dark:text-gray-400 placeholder:text-gray-600'
        />
      </div>

      {/* <Menu as='div' className='relative  z-40'>
        <div>
          <Menu.Button className='flex items-center gap-2 bg-black dark:bg-violet-800 py-2 px-4 rounded'>
            <IoFilterSharp className='text-white text-xl' />
            <span className='text-white text-base'>Filter</span>
          </Menu.Button>
        </div>
        <TransitionWrapper>
          <Menu.Items className='absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-800  shadow-lg ring-1 ring-black/5 focus:outline-none'>
            <div className='px-1 py-1 '>
              <Menu.Item>
                {({ active }) => (
                  <button
                    to='/settings'
                    className={`${
                      active
                        ? "bg-violet-500/10 text-gray-900 dark:text-white"
                        : "text-gray-900 dark:text-gray-500"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Income
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-violet-500/10 text-gray-900 dark:text-white"
                        : "text-gray-900 dark:text-gray-500"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Expense
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </TransitionWrapper>
      </Menu> */}
    </div>
  );
};

export default SearchBox;
