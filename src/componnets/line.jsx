import { useState, useEffect, useCallback } from "react";
import { Line as KonvaLine } from "react-konva";

function Line({ hotSpot }) {
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [middlePoint, setMiddlePoint] = useState({ x: 0, y: 0 });
const label = hotSpot.label;
const blueMarker = hotSpot.blueMarker;
console.log({label, blueMarker})
  const handleUpdate = useCallback(() => {

    const newEndPoint = { x: hotSpot.label.centerX, y: hotSpot.label.centerY };
    const newStartPoint = { x: hotSpot.blueMarker.centerX, y: hotSpot.blueMarker.centerY };

    setEndPoint(newEndPoint);
    setStartPoint(newStartPoint);

    // Calculate the middle point (100px less on the x-axis and same y as endPoint)
    const newMiddlePoint = {
      x: newEndPoint.x - 100,
      y: newEndPoint.y,
    };
    setMiddlePoint(newMiddlePoint);
  }, [hotSpot.label.centerX, hotSpot.label.centerY, hotSpot.blueMarker.centerX, hotSpot.blueMarker.centerY]);

  useEffect(() => {
    hotSpot.addObserver({ update: handleUpdate });
    return () => {
      hotSpot.removeObserver({ update: handleUpdate });
    };
  }, [hotSpot, handleUpdate]);

  return (
    <>
      <KonvaLine
        points={[startPoint.x, startPoint.y, middlePoint.x, middlePoint.y, endPoint.x, endPoint.y]}
        stroke={"black"}
        strokeWidth={2}
      />
    </>
  );
}

export default Line;
