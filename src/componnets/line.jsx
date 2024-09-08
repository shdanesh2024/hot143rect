import { useState, useEffect, useCallback } from "react";
import { Line as KonvaLine } from "react-konva";

function Line({ hotSpot }) {
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [middlePoint, setMiddlePoint] = useState({ x: 0, y: 0 });
  
  const label = hotSpot.label;
  const blueMarker = hotSpot.blueMarker;

  const handleUpdate = useCallback(() => {
    const newEndPoint = { x: label.centerX, y: label.centerY };
    const newStartPoint = { x: blueMarker.centerX, y: blueMarker.centerY };

    setEndPoint(newEndPoint);
    setStartPoint(newStartPoint);

    // Determine the middle point based on the conditions
    let newMiddlePoint = { x: 0, y: 0 };
    const padding = 20;

    if (blueMarker.centerX > label.centerX + label.w / 2 + padding && blueMarker.centerY < label.centerY + label.h / 2) {
      // Condition 1: BlueMarker to the right and above the label
      newMiddlePoint = {
        x: label.centerX + label.w / 2 + padding,
        y: label.centerY 
      };
    } else if (blueMarker.centerX > label.centerX + label.w / 2 + padding && blueMarker.centerY <= label.centerY) {
      // Condition 2: BlueMarker to the right, vertically aligned or above the label
      newMiddlePoint = {
        x: label.centerX + label.w / 2 + padding,
        y: label.centerY,
      };
    } else if (blueMarker.centerX > label.centerX + label.w / 2 + padding && blueMarker.centerY > label.centerY) {
      // Condition 3: BlueMarker to the right and below the label
      newMiddlePoint = {
        x: label.centerX + label.w / 2 + padding,
        y: label.centerY
      };
    } else if (blueMarker.centerX === label.centerX && blueMarker.centerY > label.centerY + label.h / 2 + padding) {
      // Condition 4: BlueMarker directly below the label
      newMiddlePoint = {
        x: label.centerX,
        y: label.centerY + label.h / 2 + padding,
      };
    } else if (blueMarker.centerX < label.centerX - label.w / 2 - padding && blueMarker.centerY > label.centerY) {
      // Condition 5: BlueMarker to the left and below the label
      newMiddlePoint = {
        x: label.centerX - label.w / 2 - padding,
        y: label.centerY 
      };
    } else if (blueMarker.centerX < label.centerX - label.w / 2 - padding && blueMarker.centerY === label.centerY) {
      // Condition 6: BlueMarker to the left, vertically aligned
      newMiddlePoint = {
        x: label.centerX - label.w / 2 - padding,
        y: label.centerY,
      };
    } else if (blueMarker.centerX < label.centerX - label.w / 2 - padding && blueMarker.centerY < label.centerY) {
      // Condition 7: BlueMarker to the left and above the label
      newMiddlePoint = {
        x: label.centerX - label.w / 2 - padding,
        y: label.centerY 
      };
    } else if (blueMarker.centerX === label.centerX && blueMarker.centerY < label.centerY - label.h / 2 - padding) {
      // Condition 8: BlueMarker directly above the label
      newMiddlePoint = {
        x: label.centerX,
        y: label.centerY - label.h / 2 - padding,
      };
    } else {
      // Default case: if no conditions match, set middle point as the midpoint between start and end points
      newMiddlePoint = {
        x: (blueMarker.centerX + label.centerX) / 2,
        y: (blueMarker.centerY + label.centerY) / 2,
      };
    }

    setMiddlePoint(newMiddlePoint);
  }, [label.centerX, label.centerY, label.w, label.h, blueMarker.centerX, blueMarker.centerY]);

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
