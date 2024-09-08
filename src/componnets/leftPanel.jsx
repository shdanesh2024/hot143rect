import { useEffect, useState } from "react";
import { Layer, Rect, Stage } from "react-konva";

import { useImageStore, useHotSpotStore } from "../store/store";
import Label from "./label";
import Description from "./description";
import Line from "./line";
import Label2 from "./blueMarker.jsx";
import BlueMarker from "./blueMarker.jsx";

function LeftPanelContainer() {
  const imageSrc = useImageStore((state) => state.imageSrc);
  return (
    <div className="flex flex-col flex-grow">
      <LeftPanel imageSrc={imageSrc} />
    </div>
  );
}

function LeftPanel({ imageSrc }) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      const imgElement = document.getElementById("targetImage");
      setImageSize({
        width: imgElement.clientWidth,
        height: imgElement.clientHeight,
      });
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
        alt=""
        onLoad={handleImageLoad}
      />
      <CanvasContainer imageSize={imageSize} />
    </div>
  );
}

function CanvasContainer({ imageSize }) {
  // const markers = useMarkersStore((state) => state.markers);
  const hotSpots = useHotSpotStore((state) => state.hotSpots);

  return (
    <div className="absolute top-0 w-full h-full canvasContainer">
      <Stage width={imageSize.width} height={imageSize.height}>
        <Layer>
          <Rect
            width={imageSize.width}
            height={imageSize.height}
            // fill="blue"
            // opacity={0.01}
          />
          {hotSpots.map((hotSpot) => {
            return (
              <Line
                key={hotSpot.uuid} //this does not work
                uuid={hotSpot.uuid}
                points={[0, 0, hotSpot.description.x, hotSpot.description.y]}
                stroke={"black"}
                hotSpot={hotSpot}
              />
            )
            
          })}
        </Layer>
      </Stage>
      {/* {hotSpots.map((hotSpot) => (
        <BluePulsateMarker
          key={hotSpot.uuid} //this does not work
          uuid={hotSpot.uuid}
          top={100} // Example top value
          left={200} // Example left value
        />
      ))} */}
      {hotSpots.map((hotSpot) => (
        <Label
          key={hotSpot.uuid} //this does not work
         
          top={100} // Example top value
          left={200} // Example left value
         
          hotSpot = {hotSpot}
        />
      ))}
         {hotSpots.map((hotSpot) => (
        <BlueMarker
          key={hotSpot.uuid} //this does not work
          uuid={hotSpot.uuid}
          top={100} // Example top value
          left={200} // Example left value
          text={hotSpot.label.text}
        />
      ))}
      {/* {hotSpots.map((hotSpot) => (
        <Description
          key={hotSpot.uuid} //this does not work
          uuid={hotSpot.uuid}
          top={100} // Example top value
          left={200} // Example left value
          text={"new text"}
          hotSpot={hotSpot}
        />
      ))} */}
    </div>
  );
}

export default LeftPanelContainer;
