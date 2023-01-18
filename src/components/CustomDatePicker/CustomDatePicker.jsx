import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ value, onChange, placeholder, ...props }) => {
  return (
    <div className="w-1/3 mt-4">
      <DatePicker
        {...props}
        className="w-full px-4 py-2 text-sm font-light text-white rounded-sm bg-black-400 placeholder:text-sm"
        selected={value}
        onChange={(date) => onChange(date)}
        placeholderText={placeholder}
      />
    </div>
  );
};

export default CustomDatePicker;
