import { useState, useEffect, useCallback } from "react";
import { Line as KonvaLine } from "react-konva";

// Helper functions to calculate middle points based on different conditions
const calculateMiddlePointRightAbove = (label, padding) => ({
  x: label.centerX + label.w / 2 + padding,
  y: label.centerY,
});

const calculateMiddlePointRightAligned = (label, padding) => ({
  x: label.centerX + label.w / 2 + padding,
  y: label.centerY,
});

const calculateMiddlePointRightBelow = (label, padding) => ({
  x: label.centerX + label.w / 2 + padding,
  y: label.centerY,
});

const calculateMiddlePointDirectlyBelow = (label, padding) => ({
  x: label.centerX,
  y: label.centerY + label.h / 2 + padding,
});

const calculateMiddlePointLeftBelow = (label, padding) => ({
  x: label.centerX - label.w / 2 - padding,
  y: label.centerY,
});

const calculateMiddlePointLeftAligned = (label, padding) => ({
  x: label.centerX - label.w / 2 - padding,
  y: label.centerY,
});

const calculateMiddlePointLeftAbove = (label, padding) => ({
  x: label.centerX - label.w / 2 - padding,
  y: label.centerY,
});

const calculateMiddlePointDirectlyAbove = (label, padding) => ({
  x: label.centerX,
  y: label.centerY - label.h / 2 - padding,
});

const calculateMidPoint = (blueMarker, label) => ({
  x: (blueMarker.centerX + label.centerX) / 2,
  y: (blueMarker.centerY + label.centerY) / 2,
});

function Line({ hotSpot }) {

  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [middlePoint, setMiddlePoint] = useState({ x: 0, y: 0 });

  const { label, blueMarker } = hotSpot;
  const padding = 30;

  const handleUpdate = useCallback(() => {
    const newEndPoint = { x: label.centerX, y: label.centerY };
    const newStartPoint = { x: blueMarker.centerX, y: blueMarker.centerY };

    setEndPoint(newEndPoint);
    setStartPoint(newStartPoint);

    let newMiddlePoint = { x: 0, y: 0 };

    const xDiff = Math.abs(blueMarker.centerX - label.centerX);

    if (blueMarker.centerX > label.centerX + label.w / 2 + padding && blueMarker.centerY < label.centerY + label.h / 2) {
      newMiddlePoint = calculateMiddlePointRightAbove(label, padding);
    } else if (blueMarker.centerX > label.centerX + label.w / 2 + padding && blueMarker.centerY <= label.centerY) {
      newMiddlePoint = calculateMiddlePointRightAligned(label, padding);
    } else if (blueMarker.centerX > label.centerX + label.w / 2 + padding && blueMarker.centerY > label.centerY) {
      newMiddlePoint = calculateMiddlePointRightBelow(label, padding);
    } else if (blueMarker.centerX === label.centerX && blueMarker.centerY > label.centerY + label.h / 2 + padding) {
      newMiddlePoint = calculateMiddlePointDirectlyBelow(label, padding);
    } else if (blueMarker.centerX < label.centerX - label.w / 2 - padding && blueMarker.centerY > label.centerY) {
      newMiddlePoint = calculateMiddlePointLeftBelow(label, padding);
    } else if (blueMarker.centerX < label.centerX - label.w / 2 - padding && blueMarker.centerY === label.centerY) {
      newMiddlePoint = calculateMiddlePointLeftAligned(label, padding);
    } else if (blueMarker.centerX < label.centerX - label.w / 2 - padding && blueMarker.centerY < label.centerY) {
      newMiddlePoint = calculateMiddlePointLeftAbove(label, padding);
    } else if (blueMarker.centerX === label.centerX && blueMarker.centerY < label.centerY - label.h / 2 - padding) {
      newMiddlePoint = calculateMiddlePointDirectlyAbove(label, padding);
    } else {
      if (xDiff <= padding) {
        newMiddlePoint = calculateMidPoint(blueMarker, label);
      } else if (xDiff < 50) {
        newMiddlePoint = {
          x: label.centerX,
          y: blueMarker.centerY,
        };
      } else if (blueMarker.centerY > label.centerY) {
        newMiddlePoint = {
          x: label.centerX,
          y: label.centerY + padding,
        };
      } else {
        newMiddlePoint = {
          x: label.centerX,
          y: label.centerY - padding,
        };
      }
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
