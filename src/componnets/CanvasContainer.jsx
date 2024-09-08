import React from "react";
import { Stage, Layer, Rect } from "react-konva";
import { useHotSpotStore } from "../store/store";
import Line from "./Line";
import Label from "./Label";
import BlueMarker from "./BlueMarker";

function CanvasContainer({ imageSize }) {
  const hotSpots = useHotSpotStore((state) => state.hotSpots);

  return (
    <div className="absolute top-0 w-full h-full canvasContainer">
      <Stage width={imageSize.width} height={imageSize.height}>
        <Layer>
          <Rect width={imageSize.width} height={imageSize.height} />
          {hotSpots.map((hotSpot) => (
            <Line
              key={hotSpot.uuid}
              uuid={hotSpot.uuid}
              points={[0, 0, hotSpot.description.x, hotSpot.description.y]}
              stroke="black"
              hotSpot={hotSpot}
            />
          ))}
        </Layer>
      </Stage>
      {hotSpots.map((hotSpot) => (
        <Label
          key={hotSpot.uuid}
          top={100}
          left={200}
          hotSpot={hotSpot}
        />
      ))}
      {hotSpots.map((hotSpot) => (
        <BlueMarker
          key={hotSpot.uuid}
          uuid={hotSpot.uuid}
          top={100}
          left={200}
          text={hotSpot.label.text}
        />
      ))}
    </div>
  );
}

export default CanvasContainer;
