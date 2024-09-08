import interact from "interactjs";
import { useEffect } from "react";
import { useHotSpotStore } from "../store/store";
import { useState } from "react";
import { useCallback } from "react";
function BlueMarker({ left, top, uuid, text }) {
    const setSelectedHotSpot = useHotSpotStore((state) => state.setSelectedHotSpot);
    const selectedHotSpot = useHotSpotStore((state) => state.selectedHotSpot);
    const [isHovered, setIsHovered] = useState(false);

   
  useEffect(() => {
    const draggableElement = document.getElementById(`blue-${uuid}`);
    const parentElement = draggableElement.parentElement;
    const blueCircleElement = document.querySelector(`#blue-${uuid} > .blueCircle`);

    interact(draggableElement).draggable({
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
        //   endOnly: true,
        }),
      ],
      autoScroll: true,
      listeners: {
        // start:()=>{
        //     console.log({uuid})
        //     setSelectedHotSpot(uuid)
        // },
        move: (event) => {
          const target = event.target;
          const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
          const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

          target.style.transform = `translate(${x}px, ${y}px)`;
          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);
        //   console.log('Selected HotSpot:', selectedHotSpot);

          selectedHotSpot.updateblueMarkerPosition(x+left, y+top)
        // console.log(x+left, y+top, target.getAttribute('id'))
        // Calculate parent element dimensions and position
        const parentRect = parentElement.getBoundingClientRect();
        const parentLeft = parentRect.left;
        const parentTop = parentRect.top;

        // Calculate div center relative to parent element
        const rect = target.getBoundingClientRect();
        console.log({rect})
        const centerX = rect.left - parentLeft + blueCircleElement.offsetWidth / 2;
        const centerY = rect.top - parentTop + blueCircleElement.offsetHeight / 2;
        
        selectedHotSpot.updateBlueMarkerCenter(centerX, centerY)
        // console.log({vv:77, centerX: rect.width / 2, centerY:rect.height / 2 });
        selectedHotSpot.updateLabelPosition(x + left, y + top);
        },
      },
    });

    return () => {
      interact(draggableElement).unset();
    };
  }, [left, top, uuid]);
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  const handleClick = ()=>{
    setSelectedHotSpot(uuid)
    console.log(selectedHotSpot)
  }
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

export default BlueMarker;
