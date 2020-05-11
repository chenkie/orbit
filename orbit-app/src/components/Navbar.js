import React from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AvatarDropdown from './AvatarDropdown';

const SearchInput = () => (
  <div className="flex">
    <input
      className="py-2 px-4 border bg-gray-100 border-gray-300 rounded-full focus:outline-none w-32 sm:w-64"
      placeholder="Search"
    />
    <button className="rounded-full bg-gradient px-4 ml-2 text-white flex items-center text-xs focus:outline-none shadow-lg">
      <FontAwesomeIcon icon={faArrowRight} />
    </button>
  </div>
);

const Navbar = () => {
  return (
    <nav className="flex justify-between px-4">
      <div className="">
        <SearchInput />
      </div>
      <div className="">
        <AvatarDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
