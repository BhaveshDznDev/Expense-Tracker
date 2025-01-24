import React from "react";

const InputField = React.forwardRef(
  ({ label, name, type, placeholder, register, error, readOnly }, ref) => {
    return (
      <div className='w-full mb-4'>
        {label && (
          <label className='labelStyles' htmlFor={name}>
            {label}
          </label>
        )}
        <input
          className='inputStyles'
          id={name}
          type={type || "text"}
          placeholder={placeholder}
          ref={ref}
          {...register}
          readOnly={readOnly || false}
        />
        {error && (
          <span className='text-xs text-[#f64949fe] mt-0.5 '>{error}</span>
        )}
      </div>
    );
  }
);

export default InputField;
