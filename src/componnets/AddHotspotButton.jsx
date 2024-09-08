import React from "react";

function AddHotspotButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 m-4 font-bold text-white bg-blue-500 rounded select-none hover:bg-blue-700 focus:outline-none focus:shadow-outline"
    >
      Add Hotspot
    </button>
  );
}

export default AddHotspotButton;
