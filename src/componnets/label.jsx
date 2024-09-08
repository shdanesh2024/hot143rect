import interact from "interactjs";
import { useEffect, useState } from "react";
import { useHotSpotStore } from "../store/store";

function Label({ left, top, hotSpot }) {
  const uuid = hotSpot.uuid;
  const [text, setText] = useState(hotSpot.label.text);

  const setSelectedHotSpot = useHotSpotStore(
    (state) => state.setSelectedHotSpot
  );
  const selectedHotSpot = useHotSpotStore((state) => state.selectedHotSpot);

  useEffect(() => {
    const draggableElement = document.getElementById(`label-${uuid}`);

    interact(draggableElement).draggable({
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
        }),
      ],
      autoScroll: true,
      listeners: {
        move: (event) => {
          const target = event.target;
          const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
          const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

          target.style.transform = `translate(${x}px, ${y}px)`;
          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);

          setSelectedHotSpot(uuid);
          selectedHotSpot.updateLabelPosition(x + left, y + top);
        },
      },
    });

    return () => {
      interact(draggableElement).unset();
    };
  }, [left, top, uuid, setSelectedHotSpot, selectedHotSpot]);

  useEffect(() => {
    const observer = {
      update: (updatedHotSpot) => {
        if (updatedHotSpot.uuid === hotSpot.uuid) {
          setText(updatedHotSpot.label.text);
        }
      },
    };

    selectedHotSpot.addObserver(observer);

    return () => {
      selectedHotSpot.removeObserver(observer);
    };
  }, [hotSpot, selectedHotSpot]);

  const handleClick = () => {
    setSelectedHotSpot(uuid);
  };

  return (
    <div
      onClick={handleClick}
      id={`label-${uuid}`}
      className="absolute top-0 p-2 opacity-50 text-white bg-orange-600 shadow-md select-none draggable"
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      <p>{text}</p>
    </div>
  );
}

export default Label;
