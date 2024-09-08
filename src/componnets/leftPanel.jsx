import React, { useEffect, useState } from "react";
import CanvasContainer from "./CanvasContainer";

function LeftPanel({ imageSrc }) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  
  // Log imageSrc to check if it's passed correctly
  console.log("Image source in LeftPanel:", imageSrc);

  useEffect(() => {
    const handleResize = () => {
      const imgElement = document.getElementById("targetImage");
      if (imgElement) {
        setImageSize({
          width: imgElement.clientWidth,
          height: imgElement.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageLoad = (event) => {
    const imgElement = event.target;
    setImageSize({
      width: imgElement.clientWidth,
      height: imgElement.clientHeight,
    });
  };

  return (
    <div className="relative flex-grow min-h-full bg-green-700">
      <img
        className="w-full"
        id="targetImage"
        src={imageSrc}
        alt="Loaded image"
        onLoad={handleImageLoad}
      />
      <CanvasContainer imageSize={imageSize} />
    </div>
  );
}

export default LeftPanel;
