import { useState } from "react";
import { useHotSpotStore } from "../store/store";
const Input = ({ value,  placeholder, className }) => {
    const { labelInputTxt, setLabelInputTxt } = useHotSpotStore(); // Destructure the function from the store

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLabelInputTxt(newValue); // Call setLabelInputTxt to update labelInputTxt in the store
  };
    return (
      <div className="flex w-full px-4">
        <input
        className={`bg-gray-200 w-full  px-4 py-2 outline-none focus:bg-white ${className}`}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      </div>
    );
  };
  
  export default Input;