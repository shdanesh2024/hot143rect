import { useEffect, useState, useCallback } from "react";
import { useHotSpotStore } from "../../../store/store";
import interact from "interactjs";

export default function BluePulsateMarker({ left, top, uuid }) {
  const [isHovered, setIsHovered] = useState(false);
  const setSelectedHotSpot = useHotSpotStore((state) => state.setSelectedHotSpot);
  const selectedHotSpot = useHotSpotStore((state) => state.selectedHotSpot);
  const dragMoveListener = useCallback((event) => {
    const target = event.target;
    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
    // console.log({x: x+left,y: y+top})
    selectedHotSpot.updateMarkerPosition(x+left, y+top)
    // console.log({selected: selectedHotSpot.marker})
  }, [left, top, selectedHotSpot]);

  const initializeInteract = useCallback(() => {
    interact(`#blue-${uuid}`).draggable({
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
        }),
      ],
      autoScroll: true,
      listeners: {
        start: () => {},
        move: dragMoveListener,
      },
    });
  }, [dragMoveListener, uuid]);

  useEffect(() => {
    setSelectedHotSpot(uuid);
    initializeInteract();
  }, [uuid, setSelectedHotSpot, initializeInteract]);

  const handleClick = useCallback(() => {
    setSelectedHotSpot(uuid);
    // console.log(selectedHotSpot);
  }, [uuid, setSelectedHotSpot, selectedHotSpot]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      onClick={handleClick}
      id={`blue-${uuid}`}
      style={{ top: `${top}px`, left: `${left}px` }}
      className="absolute" //this work
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={`blueRing ${isHovered ? "" : "animate-pulsate"}`}></span>
      <span className="blueCircle">
        <span
          className={`blueDot ${isHovered ? "animate-stop-pulsat" : ""}`}
        ></span>
      </span>
    </div>
  );
}
