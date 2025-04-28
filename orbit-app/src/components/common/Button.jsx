import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const Button = ({ type, text, loading }) => (
  <button
    type={type}
    className="group relative flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-gradient focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-100 ease-in-out shadow-lg"
  >
    {loading ? (
      <span className="flex items-center">
        <FontAwesomeIcon icon={faCircleNotch} spin />
        <span className="ml-2">Loading...</span>
      </span>
    ) : (
      <span>{text}</span>
    )}
  </button>
);

export default Button;
