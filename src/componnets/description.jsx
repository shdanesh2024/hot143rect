import { useState, useEffect, useCallback, useRef } from "react";
import interact from "interactjs";

function Description({ hotSpot }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState(200); // Initial width
  const [height, setHeight] = useState(); // Initial height

  const descriptionRef = useRef(null);

  const updatePosition = useCallback(() => {
    // Find the Label element by ID
    const labelElement = document.getElementById(`label-${hotSpot.uuid}`);
    const canvasContainer = document.querySelector('.canvasContainer'); // Parent container

    if (labelElement && canvasContainer) {
      const labelRect = labelElement.getBoundingClientRect(); // Get label dimensions and position
      const containerRect = canvasContainer.getBoundingClientRect(); // Get canvas container position

      let x = 0;
      let y = 0;

      // Adjust the description position based on the hotSpot description position
      switch (hotSpot.description.position) {
        case 'top-right':
          x = labelRect.right;
          y = labelRect.top - containerRect.top; // Position the description above the label
          break;
        case 'top-left':
          x = labelRect.left - width; // Position the description to the left of the label
          y = labelRect.top - containerRect.top; // Position the description above the label
          break;
        case 'bottom-right':
          x = labelRect.right;
          y = labelRect.bottom - containerRect.top; // Position the description below the label
          break;
        case 'bottom-left':
          x = labelRect.left - width; // Position the description to the left of the label
          y = labelRect.bottom - containerRect.top; // Position the description below the label
          break;
        default:
          x = labelRect.right;
          y = labelRect.top - containerRect.top; // Default to top-right if no position is specified
      }

      setPosition({ x, y });
    }
  }, [hotSpot.uuid, hotSpot.description.position, width]);

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

    // Initialize interact.js for resizing the width only
    interact(element).resizable({
      edges: { left: false, right: true, bottom: false, top: false }, // Only allow resizing from the right edge
      listeners: {
        move(event) {
          let { width: newWidth } = event.rect;
          let { height: newHeight } = event.rect;

          // Optionally, set minimum and maximum width
          if (newWidth < 150) newWidth = 150; // Minimum width
          if (newWidth > 600) newWidth = 600; // Maximum width

          setWidth(newWidth);
          setHeight(newHeight);

          // Update the hotspot description with the new width
          hotSpot.updateDescriptionWH(newWidth, newHeight);
        }
      }
    });

    return () => {
      interact(element).unset(); // Clean up when the component unmounts
    };
  }, [hotSpot]);

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
        width: `${width}px`,
        height: 'auto', // Automatically adjust height to fit content
        backgroundColor: 'white',
        position: 'absolute',
        overflow: 'auto',
      }}
      className="p-2 text-black shadow-md select-none"
    >
      {renderDescription()}
    </div>
  );
}

export default Description;
