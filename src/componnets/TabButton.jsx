import React from "react";

function TabButton({ title, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 m-2 font-bold text-white ${
        active ? "bg-blue-500" : "bg-gray-500"
      } rounded select-none hover:bg-blue-700 focus:outline-none focus:shadow-outline`}
    >
      {title}
    </button>
  );
}

export default TabButton;
