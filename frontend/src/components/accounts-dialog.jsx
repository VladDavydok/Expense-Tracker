import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { BiTransfer } from 'react-icons/bi';
import { FaMoneyCheckDollar } from 'react-icons/fa6';
import { MdMoreVert } from 'react-icons/md';
import React, { Fragment } from 'react';

export default function AccountMenu({ addMoney, transferMoney }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex w-full justify-center rounded-md text-sm font-medium text-gray-600 dark:text-gray-300">
        <MdMoreVert />
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute p-2 right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg dark:bg-gray-800">
          <div className="px-1 py-1 space-y-2">
            <MenuItem>
              {({}) => (
                <button
                  onClick={transferMoney}
                  className="group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <BiTransfer />
                  Transfer Funds
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({}) => (
                <button
                  onClick={addMoney}
                  className="group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaMoneyCheckDollar />
                  Add Money
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
