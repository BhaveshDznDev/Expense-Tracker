import React from "react";
import { FaSpinner } from "react-icons/fa";

const Button = ({ type, label, className, loading }) => {
  return (
    <button
      disabled={loading}
      className={`flex items-center justify-center py-2 px-4 rounded outline-none disabled:cursor-not-allowed ${className}`}
      type={type || "button"}
    >
      {loading ? <FaSpinner className='text-xl animate-spin' /> : label}
    </button>
  );
};

export default Button;
