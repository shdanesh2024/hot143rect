import { useState, useEffect } from "react";
import { useHotSpotStore } from "../store/store";

const Input = ({ value, placeholder, className }) => {
  const { labelInputTxt, setLabelInputTxt } = useHotSpotStore(); // Destructure the function from the store

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLabelInputTxt(newValue); // Update the label input text in the store

    // Get the width and height of the div with id="label" whenever the input changes
    const labelElement = document.getElementById("label");
    if (labelElement) {
      const width = labelElement.offsetWidth;
      const height = labelElement.offsetHeight;

      // console.log(`Label width: ${width}px, Label height: ${height}px`);
    }
  };

  return (
    <div className="flex w-full px-4">
      <input
        className={`bg-gray-200 w-full px-4 py-2 outline-none focus:bg-white ${className}`}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
     
    </div>
  );
};

export default Input;
