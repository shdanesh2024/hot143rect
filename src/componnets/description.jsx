import { useState, useEffect, useCallback, useRef } from "react";
import interact from "interactjs";

function Description({ hotSpot }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState(200); // Initial width
  const descriptionRef = useRef(null);

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

  useEffect(() => {
    const element = descriptionRef.current;

    if (!element) return;

    // Initialize interact.js for resizing
    interact(element).resizable({
      edges: { left: false, right: true, bottom: false, top: false }, // Only allow resizing from the right edge
      listeners: {
        move(event) {
          let { width: newWidth } = event.rect;

          // Optionally, set minimum and maximum width
          if (newWidth < 150) newWidth = 150; // Minimum width
          if (newWidth > 600) newWidth = 600; // Maximum width

          setWidth(newWidth);
        }
      }
    });

    return () => {
      interact(element).unset(); // Clean up when the component unmounts
    };
  }, []);

  const renderDescription = () => {
    const descriptionText = hotSpot.description.text;
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(descriptionText); // Simple check for HTML tags

    if (isHtml) {
      return <div dangerouslySetInnerHTML={{ __html: descriptionText }} />;
    } else {
      return <div>{descriptionText || 'No Description'}</div>;
    }
  };

  return (
    <div
      ref={descriptionRef}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${width}px`, // Dynamically set the width based on interact.js resizing
        backgroundColor: 'white', // White background
        position: 'absolute', // Make it absolute to allow positioning
        overflow: 'auto', // Ensure content remains scrollable if too long
      }}
      className="p-2 text-black shadow-md select-none"
    >
      {renderDescription()}
    </div>
  );
}

export default Description;
