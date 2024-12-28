import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BsList, BsX } from 'react-icons/bs';
import useStore from '../store';
import TransitionWrapper from './wrappers/transition-wrapper';

const Navbar = () => {
  const { user, setCredentails } = useStore((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setCredentails(null);
    navigate('/sign-in');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl font-bold text-indigo-600 dark:text-indigo-400"
            >
              My-Finance
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
            <Link
              to="/overview"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              Transactions
            </Link>
            <Link
              to="/accounts"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              Accounts
            </Link>
            <Link
              to="/settings"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              Settings
            </Link>
          </div>

          <Menu as="div" className="relative z-50">
            <MenuButton>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="flex items-center justify-center w-10 h-10 text-white bg-purple-600 rounded-full">
                  <p className="text-lg font-bold">
                    {user?.firstname?.charAt(0)}
                  </p>
                </div>
                <MdOutlineKeyboardArrowDown className="text-xl text-gray-600 dark:text-gray-300" />
              </div>
            </MenuButton>

            <TransitionWrapper>
              <MenuItems className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-slate-900">
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 text-white bg-purple-600 rounded-full">
                      <p className="text-lg font-bold">
                        {user?.firstname?.charAt(0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        {user?.firstname}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <MenuItem>
                    {({ active }) => (
                      <Link to="/settings">
                        <button
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                          } text-gray-900 dark:text-gray-300 w-full text-left px-2 py-2 rounded-md text-sm`}
                        >
                          Profile
                        </button>
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleSignOut}
                        className={`${
                          active ? 'bg-red-50 dark:bg-red-700/25' : ''
                        } text-red-600 dark:text-white w-full text-left px-2 py-2 rounded-md text-sm`}
                      >
                        Sign Out
                      </button>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </TransitionWrapper>
          </Menu>

          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
            >
              {isOpen ? <BsX size={24} /> : <BsList size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/overview"
            className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-4 py-2"
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
          <Link
            to="/transactions"
            className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-4 py-2"
            onClick={toggleMenu}
          >
            Transactions
          </Link>
          <Link
            to="/accounts"
            className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-4 py-2"
            onClick={toggleMenu}
          >
            Accounts
          </Link>
          <Link
            to="/settings"
            className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-4 py-2"
            onClick={toggleMenu}
          >
            Settings
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
