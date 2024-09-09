import interact from "interactjs";
import { useEffect, useState, useCallback } from "react";
import { useHotSpotStore } from "../store/store";

// Custom hook for draggable logic
const useDraggableLabel = (uuid, left, top) => {
  const setSelectedHotSpot = useHotSpotStore((state) => state.setSelectedHotSpot);
  const selectedHotSpot = useHotSpotStore((state) => state.selectedHotSpot);

  useEffect(() => {
    const draggableElement = document.getElementById(`label-${uuid}`);

    if (!draggableElement) return;

    const onMove = (event) => {
      const target = event.target;
      const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      target.style.transform = `translate(${x}px, ${y}px)`;
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);

      if (selectedHotSpot && selectedHotSpot.uuid === uuid) {
        const centerX = x + left + target.offsetWidth / 2;
        const centerY = y + top + target.offsetHeight / 2;

        selectedHotSpot.updateLabelCenter(centerX, centerY);
        selectedHotSpot.updateLabelPosition(x + left, y + top);
      }
    };

    const interactInstance = interact(draggableElement).draggable({
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
        }),
      ],
      autoScroll: true,
      listeners: {
        start: () => {
          setSelectedHotSpot(uuid); // Set selected hotspot on drag start
        },
        move: onMove,
      },
    });

    return () => interactInstance.unset();
  }, [uuid, left, top, selectedHotSpot, setSelectedHotSpot]);
};

// Custom hook for HotSpot observer
const useHotSpotObserver = (hotSpot, setText) => {
  const selectedHotSpot = useHotSpotStore((state) => state.selectedHotSpot);

  useEffect(() => {
    const observer = {
      update: (updatedHotSpot) => {
        if (updatedHotSpot.uuid === hotSpot.uuid) {
          setText(updatedHotSpot.label.text);
        }
      },
    };

    if (selectedHotSpot) {
      selectedHotSpot.addObserver(observer);
    }

    return () => {
      if (selectedHotSpot) {
        selectedHotSpot.removeObserver(observer);
      }
    };
  }, [hotSpot, setText, selectedHotSpot]);
};

function Label({ left, top, hotSpot }) {
  const uuid = hotSpot.uuid;
  const [text, setText] = useState(hotSpot.label.text);
  const setSelectedHotSpot = useHotSpotStore((state) => state.setSelectedHotSpot);

  // Use custom hook for draggable functionality
  useDraggableLabel(uuid, left, top);

  // Use custom hook for HotSpot observer
  useHotSpotObserver(hotSpot, setText);

  const handleClick = useCallback(() => {
    setSelectedHotSpot(uuid); // Set the selectedHotSpot on click
  }, [setSelectedHotSpot, uuid]);

  return (
    <div
      onClick={handleClick}
      id={`label-${uuid}`}
      className="absolute top-0 p-2 opacity-90 text-white bg-orange-600 shadow-md select-none draggable"
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      <p>{text}</p>
    </div>
  );
}

export default Label;
