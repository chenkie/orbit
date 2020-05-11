import React from 'react';

const Input = ({ ariaLabel, name, type, placeholder, field }) => (
  <input
    {...field}
    aria-label={ariaLabel}
    name={name}
    type={type}
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
    placeholder={placeholder}
  />
);

export default Input;
