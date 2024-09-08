import React from "react";
import { useImageStore } from "../store/store";
import LeftPanel from "./leftPanel";

function LeftPanelContainer() {
  const imageSrc = useImageStore((state) => state.imageSrc); // Fetching imageSrc from the store
  console.log(imageSrc);
  if (!imageSrc) {
    console.log("Image source is undefined"); // Log an error if imageSrc is not defined
    return <div>No image source available</div>;
  }

  return (
    <div className="flex flex-col flex-grow">
      <LeftPanel imageSrc={imageSrc} />
    </div>
  );
}

export default LeftPanelContainer;
