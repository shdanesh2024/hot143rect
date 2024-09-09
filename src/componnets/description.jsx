import { useState, useLayoutEffect, useCallback, useRef } from "react";
import interact from "interactjs";

function Description({ hotSpot }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState(200); 
  const [height, setHeight] = useState(0); 

  const descriptionRef = useRef(null);

  const updatePosition = useCallback(() => {
    // Find the Label element by ID
    const labelElement = document.getElementById(`label-${hotSpot.uuid}`);
    const canvasContainer = document.querySelector('.canvasContainer'); 

    if (labelElement && canvasContainer) {
      const labelRect = labelElement.getBoundingClientRect(); 
      const containerRect = canvasContainer.getBoundingClientRect(); 

      let x = 0;
      let y = 0;

      // Adjust the description position based on the hotSpot description position
      switch (hotSpot.description.position) {
        case 'top-right':
          x = labelRect.right;
          y = labelRect.top - containerRect.top; 
          break;
        case 'top-left':
          x = labelRect.left - width; 
          y = labelRect.top - containerRect.top; 
          break;
        case 'bottom-right':
          x = labelRect.right;
          y = labelRect.bottom - containerRect.top - height; 
          break;
        case 'bottom-left':
          x = labelRect.left - width; 
          y = labelRect.bottom - containerRect.top - height; 
          break;
        default:
          x = labelRect.right;
          y = labelRect.top - containerRect.top; 
      }

      setPosition({ x, y });
    }
  }, [hotSpot.uuid, hotSpot.description.position, width, height]);

  // Update the width and height after the component is mounted and first rendered
  useLayoutEffect(() => {
    const element = descriptionRef.current;

    if (element) {
      const { width: initialWidth, height: initialHeight } = element.getBoundingClientRect();
      setWidth(initialWidth);
      setHeight(initialHeight); 

      // Update the hotspot description with the initial width and height
      hotSpot.updateDescriptionWH(initialWidth, initialHeight);
    }
  }, [hotSpot]);

  useLayoutEffect(() => {
    // Update position when component mounts or when hotSpot updates
    updatePosition();
    hotSpot.addObserver({ update: updatePosition });
    return () => {
      hotSpot.removeObserver({ update: updatePosition });
    };
  }, [hotSpot, updatePosition]);

  useLayoutEffect(() => {
    const element = descriptionRef.current;

    if (!element) return;

    // Initialize interact.js for resizing the width only
    interact(element).resizable({
      edges: { left: false, right: true, bottom: false, top: false }, 
      listeners: {
        move(event) {
          let { width: newWidth } = event.rect;

          // Optionally, set minimum and maximum width
          if (newWidth < 150) newWidth = 150; 
          if (newWidth > 600) newWidth = 600;

          setWidth(newWidth);
          setHeight(element.offsetHeight); // Update height after resizing

          // Update the hotspot description with the new width
          hotSpot.updateDescriptionWH(newWidth, element.offsetHeight); 
        }
      }
    });

    return () => {
      interact(element).unset(); 
    };
  }, [hotSpot]);

  const renderDescription = () => {
    const descriptionText = hotSpot.description.text;
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(descriptionText); 

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
        height: 'auto', 
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