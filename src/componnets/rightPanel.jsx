import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useHotSpotStore } from "../store/store";
import { HotSpot } from "../utils/xx";
import Input from "./input";
import TabButton from "./TabButton";
import AddHotspotButton from "./AddHotspotButton";
import EditInput from "./EditInput";

function RightPanel() {
  const [activeTab, setActiveTab] = useState("tab1");
  const AddHotSpot = useHotSpotStore((state) => state.addHotSpot);
  const labelInputTxt = useHotSpotStore((state) => state.labelInputTxt);
  const setSelectedHotSpot = useHotSpotStore((state) => state.setSelectedHotSpot);
  const labelWidth = useHotSpotStore((state) => state.labelWidth);
  const labelHeight = useHotSpotStore((state) => state.labelHeight);

  const handleAddHotSpot = () => {
    const uuid = uuidv4();
    const hotSpot = new HotSpot(labelInputTxt, labelWidth, labelHeight, "description", uuid);
    AddHotSpot(hotSpot);
    setSelectedHotSpot(uuid); // Set the newly added hotspot as selected
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
      </div>
      <div className={activeTab === "tab2" ? "block" : "hidden"}>
        <EditInput />
      </div>
    </div>
  );
}

export default RightPanel;
