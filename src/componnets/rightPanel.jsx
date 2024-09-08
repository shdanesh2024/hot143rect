import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useHotSpotStore } from "../store/store";
import { HotSpot } from "../utils/xx";
import Input from "./input";
import { useRef } from "react";

function RightPanel() {
  const [activeTab, setActiveTab] = useState("tab1");

  const AddHotSpot = useHotSpotStore((state) => state.addHotSpot);
  const labelInputTxt = useHotSpotStore((state) => state.labelInputTxt);
  const setSelectedHotSpot = useHotSpotStore(
    (state) => state.setSelectedHotSpot
  );
  
  const labelRef = useRef(null);
  const handleAddHotSpot = () => {
    const uuid = uuidv4();
    const hotSpot = new HotSpot(labelInputTxt, "description", uuid);
    AddHotSpot(hotSpot);
    setSelectedHotSpot(uuid);
  };
  return (
    <div className="w-[400px] min-h-full bg-slate-950 relative flex flex-col">
      <div className="flex justify-center mb-4">
        <TabButton
          title="Tab 1"
          onClick={() => setActiveTab("tab1")}
          active={activeTab === "tab1"}
        />
        <TabButton
          title="Tab 2"
          onClick={() => setActiveTab("tab2")}
          active={activeTab === "tab2"}
        />
      </div>
      <div className={activeTab === "tab1" ? "block" : "hidden"}>
        <AddHotspotButton onClick={handleAddHotSpot} />
        <Input placeholder="Enter something..." />
        <div
        // onClick={handleClick}
        ref={labelRef}
        className="absolute top-0 p-2 text-white bg-orange-600 shadow-md select-none draggable "
        // style={{ top: `${top}px`, left: `${left}px` }}
      >
        <p>{labelInputTxt}</p>
      </div>
      </div>
      <div className={activeTab === "tab2" ? "block" : "hidden"}>
        <EditInput />
      </div>
    </div>
  );
}

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

function EditInput() {
  const selectedHotSpot = useHotSpotStore((state) => state.selectedHotSpot);
  const [value, setValue] = useState("");
  const labelRef = useRef(null);
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    const rect = labelRef.current.getBoundingClientRect();
    const width = rect.width
    const height = rect.height
    selectedHotSpot?.updateLabelText_W_H(newValue, width, height);
    // console.log(selectedHotSpot.label);
  };
  return (
    <div className="flex w-full px-4">
      <input
        className={`bg-gray-200 w-full  px-4 py-2 outline-none focus:bg-white `}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="edit label"
      />
      <div
        // onClick={handleClick}
        ref={labelRef}
        className="absolute top-0 p-2 text-white bg-orange-600 shadow-md select-none draggable "
        // style={{ top: `${top}px`, left: `${left}px` }}
      >
        <p>{value}</p>
      </div>
    </div>
  );
}

export default RightPanel;
