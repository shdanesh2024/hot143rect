import React, { useState, useRef, useEffect } from "react";
import { useHotSpotStore } from "../store/store";

function EditInput() {
  const selectedHotSpot = useHotSpotStore((state) => state.selectedHotSpot);
  const setLabelWidth = useHotSpotStore((state) => state.setLabelWidth);
  const setLabelHeight = useHotSpotStore((state) => state.setLabelHeight);
  const [value, setValue] = useState("");
  const labelRef = useRef(null);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Get dimensions of the label div and update the hotspot and the store
    const rect = labelRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Update the selected hotspot's label dimensions and text
    selectedHotSpot?.updateLabelText_W_H(newValue, width, height);

    // Update the label dimensions in the global store
    setLabelWidth(width);
    setLabelHeight(height);
  };

  useEffect(() => {
    // On component mount or when value changes, calculate initial width and height
    if (labelRef.current) {
      const rect = labelRef.current.getBoundingClientRect();
      setLabelWidth(rect.width);
      setLabelHeight(rect.height);
    }
  }, [setLabelWidth, setLabelHeight, value]); // Trigger on value change

  return (
    <div className="flex w-full px-4">
      <input
        className="bg-gray-200 w-full px-4 py-2 outline-none focus:bg-white"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="edit label"
      />
      <div
        ref={labelRef}
        className="absolute top-0 p-2 text-white bg-orange-600 shadow-md select-none draggable"
      >
        <p>{value}</p>
      </div>
    </div>
  );
}

export default EditInput;
