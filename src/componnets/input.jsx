import { useRef, useEffect } from "react";
import { useHotSpotStore } from "../store/store";

const Input = ({ value, placeholder, className }) => {
  const { setLabelInputTxt, setLabelWidth, setLabelHeight, labelInputTxt } = useHotSpotStore();
  const labelRef = useRef(null); // Ref to track the label dimensions

  // Handle input change
  const handleChange = (e) => {
    setLabelInputTxt(e.target.value); // Update the store with the new input text
  };

  // Update label dimensions whenever the label text changes
  useEffect(() => {
    const labelElement = labelRef.current;
    if (labelElement) {
      const width = labelElement.offsetWidth;
      const height = labelElement.offsetHeight;
      setLabelWidth(width); // Update label width in the store
      setLabelHeight(height); // Update label height in the store
    }
  }, [labelInputTxt, setLabelWidth, setLabelHeight]); // Re-run whenever label text changes

  return (
    <div className="flex w-full px-4">
      <input
        className={`bg-gray-200 w-full px-4 py-2 outline-none focus:bg-white ${className}`}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <div
        id="label"
        ref={labelRef}
        className="absolute top-0 p-2 text-white bg-orange-600 shadow-md select-none draggable"
      >
        <p>{labelInputTxt}</p>
      </div>
    </div>
  );
};

export default Input;
