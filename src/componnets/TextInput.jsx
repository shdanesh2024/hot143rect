import { useRef, useEffect } from "react";
import { useHotSpotStore } from "../store/store";

const TextInput = ({ value, placeholder, className, type }) => {
  const {
    setLabelInputTxt,
    setLabelWidth,
    setLabelHeight,
    setDescriptionText,
    labelInputTxt,
    descriptionText,
  } = useHotSpotStore();
  
  const inputRef = useRef(null); // Ref for input element

  // Handle input change based on type
  const handleChange = (e) => {
    if (type === "label") {
      setLabelInputTxt(e.target.value); // Update label text in store
    } else if (type === "description") {
      setDescriptionText(e.target.value); // Update description text in store
    }
  };

  // Get label dimensions if the type is label
  useEffect(() => {
    if (type === "label" && inputRef.current) {
      const labelElement = inputRef.current;
      const width = labelElement.offsetWidth;
      const height = labelElement.offsetHeight;
      setLabelWidth(width);
      setLabelHeight(height);
    }
  }, [type, labelInputTxt, setLabelWidth, setLabelHeight]);

  // Determine value and provide a fallback if null
  const displayValue = type === "label" ? (labelInputTxt || '') : (descriptionText || '');

  return (
    <div className="flex w-full px-4">
      <input
        className={`bg-gray-200 w-full px-4 py-2 outline-none focus:bg-white ${className}`}
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {type === "label" && (
        <div
          ref={inputRef}
          className="absolute top-0 p-2 text-white bg-orange-600 shadow-md select-none draggable"
        >
          <p>{labelInputTxt}</p>
        </div>
      )}
   
    </div>
  );
};

export default TextInput;
