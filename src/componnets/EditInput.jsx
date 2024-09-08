import React, { useState, useRef } from "react";
import { useHotSpotStore } from "../store/store";

function EditInput() {
  const selectedHotSpot = useHotSpotStore((state) => state.selectedHotSpot);
  const [value, setValue] = useState("");
  const labelRef = useRef(null);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    const rect = labelRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    selectedHotSpot?.updateLabelText_W_H(newValue, width, height);
  };

  return (
    <div className="flex w-full px-4">
      <input
        className="bg-gray-200 w-full px-4 py-2 outline-none focus:bg-white"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="edit label"
      />
      <div ref={labelRef} className="absolute top-0 p-2 text-white bg-orange-600 shadow-md select-none draggable">
        <p>{value}</p>
      </div>
    </div>
  );
}

export default EditInput;
