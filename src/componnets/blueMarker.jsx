import interact from "interactjs";
import { useEffect, useState, useCallback } from "react";
import { useHotSpotStore } from "../store/store";

// Custom hook for draggable logic
const useDraggable = (uuid, left, top, selectedHotSpot) => {
  useEffect(() => {
    const draggableElement = document.getElementById(`blue-${uuid}`);
    const parentElement = draggableElement.parentElement;
    const blueCircleElement = draggableElement.querySelector(".blueCircle");

    if (!draggableElement || !parentElement || !blueCircleElement) return;

    const onMove = (event) => {
      const target = event.target;
      const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      target.style.transform = `translate(${x}px, ${y}px)`;
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);

      selectedHotSpot.updateblueMarkerPosition(x + left, y + top);

      const parentRect = parentElement.getBoundingClientRect();
      const rect = target.getBoundingClientRect();
      const centerX = rect.left - parentRect.left + blueCircleElement.offsetWidth / 2;
      const centerY = rect.top - parentRect.top + blueCircleElement.offsetHeight / 2;

      selectedHotSpot.updateBlueMarkerCenter(centerX, centerY);
    };

    const interactInstance = interact(draggableElement).draggable({
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
        }),
      ],
      autoScroll: true,
      listeners: { move: onMove },
    });

    return () => interactInstance.unset();
  }, [uuid, left, top, selectedHotSpot]);
};

function BlueMarker({ left, top, uuid, text }) {
  const setSelectedHotSpot = useHotSpotStore((state) => state.setSelectedHotSpot);
  const selectedHotSpot = useHotSpotStore((state) => state.selectedHotSpot);
  const [isHovered, setIsHovered] = useState(false);

  // Use custom hook for draggable functionality
  useDraggable(uuid, left, top, selectedHotSpot);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleClick = useCallback(() => {
    setSelectedHotSpot(uuid);
    console.log(selectedHotSpot);
  }, [setSelectedHotSpot, uuid, selectedHotSpot]);

  return (
    <div
      onClick={handleClick}
      id={`blue-${uuid}`}
      style={{ top: `${top}px`, left: `${left}px` }}
      className="absolute"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={`blueRing ${isHovered ? "" : "animate-pulsate"}`}></span>
      <span className="blueCircle">
        <span className={`blueDot ${isHovered ? "animate-stop-pulsat" : ""}`}></span>
      </span>
    </div>
  );
}

export default BlueMarker;
