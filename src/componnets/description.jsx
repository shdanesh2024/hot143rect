import { useState, useEffect, useCallback } from "react";

function Description({ hotSpot }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const updatePosition = useCallback(() => {
    // Find the Label element by ID
    const labelElement = document.getElementById(`label-${hotSpot.uuid}`);
    const canvasContainer = document.querySelector('.canvasContainer'); // Parent container

    if (labelElement && canvasContainer) {
      const labelRect = labelElement.getBoundingClientRect(); // Get label dimensions and position
      const containerRect = canvasContainer.getBoundingClientRect(); // Get canvas container position

      const x = labelRect.right; // X position to the right of the label
      const y = labelRect.top - containerRect.top; // Y position adjusted relative to parent container

      setPosition({ x, y });
    }
  }, [hotSpot.uuid]);

  useEffect(() => {
    // Update position when component mounts or when hotSpot updates
    updatePosition();
    hotSpot.addObserver({ update: updatePosition });
    return () => {
      hotSpot.removeObserver({ update: updatePosition });
    };
  }, [hotSpot, updatePosition]);

  return (
    <div
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: '200px', // Fixed width for description
        backgroundColor: 'white', // White background
        position: 'absolute', // Make it absolute to allow positioning
      }}
      className="p-2 text-black shadow-md select-none"
    >
      {hotSpot.description.text || 'No Description'} {/* Display description text or fallback */}
    </div>
  );
}

export default Description;
