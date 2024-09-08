import { useState, useEffect, useCallback } from "react";
import { Line as KonvaLine } from "react-konva";

function Line({ hotSpot }) {
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });

  const handleUpdate = useCallback(() => {
    setEndPoint({ x: hotSpot.label.centerX, y: hotSpot.label.centerY });
    setStartPoint({ x: hotSpot.blueMarker.centerX, y: hotSpot.blueMarker.centerY });
  }, [hotSpot.label.centerX, hotSpot.label.centerY, hotSpot.blueMarker.centerX, hotSpot.blueMarker.centerY]);

  useEffect(() => {
    hotSpot.addObserver({ update: handleUpdate });
    return () => {
      hotSpot.removeObserver({ update: handleUpdate });
    };
  }, [hotSpot, handleUpdate]);

  return (
    <KonvaLine
      points={[startPoint.x, startPoint.y, endPoint.x, endPoint.y]}
      stroke={"black"}
    />
  );
}

export default Line;
