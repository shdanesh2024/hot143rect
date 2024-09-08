import interact from "interactjs";
import { useEffect } from "react";
import { useHotSpotStore } from "../store/store";
import { useState } from "react";
function Label({ left, top, hotSpot }) {
  const uuid = hotSpot.uuid;
  const [text, setText] = useState(hotSpot.label.text); // State to hold label text

  const setSelectedHotSpot = useHotSpotStore(
    (state) => state.setSelectedHotSpot
  );
  const selectedHotSpot = useHotSpotStore((state) => state.selectedHotSpot);
  useEffect(() => {
    const draggableElement = document.getElementById(`label-${uuid}`);
    const parentElement = draggableElement.parentElement;

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

          setSelectedHotSpot(uuid);
          // Calculate parent element dimensions and position
          // const parentRect = parentElement.getBoundingClientRect();
          // const parentLeft = parentRect.left;
          // const parentTop = parentRect.top;

          // // Calculate div center relative to parent element
          // const rect = target.getBoundingClientRect();
          // const centerX = rect.left - parentLeft + rect.width / 2;
          // const centerY = rect.top - parentTop + rect.height / 2;
          // selectedHotSpot.updateLabelCenter(centerX, centerY)
          // console.log({ centerX, centerY });
          selectedHotSpot.updateLabelPosition(x + left, y + top);

          // console.log({ b: selectedHotSpot.blueMarker });
        },
      },
    });

    return () => {
      interact(draggableElement).unset();
    };
  }, [left, top, uuid]);
  // Subscribe to label text changes
  useEffect(() => {
    const observer = {
      update: (updatedHotSpot) => {
        // Check if the updated hotspot is the same as the current one
        if (updatedHotSpot.uuid === hotSpot.uuid) {
          // Update the label text
          // Assuming you have a function to update the label text
          // Replace the function call with your actual logic
          // updateLabelText(updatedHotSpot.label.text);
          setText(updatedHotSpot.label.text);
          // console.log(updatedHotSpot.label);
        }
      },
    };

    selectedHotSpot.addObserver(observer);

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      selectedHotSpot.removeObserver(observer);
    };
  }, [hotSpot, selectedHotSpot]);

  const handleClick = () => {
    setSelectedHotSpot(uuid);
    console.log(selectedHotSpot);
  };
  return (
    <div
      onClick={handleClick}
      id={`label-${uuid}`}
      className="absolute top-0 p-2 opacity-50 text-white bg-orange-600 shadow-md select-none draggable "
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      <p>{text}</p>
     
    </div>
  );
}

export default Label;
