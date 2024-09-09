import { useState, useLayoutEffect, useCallback, useRef, useEffect } from "react";
import interact from "interactjs";

function Description({ hotSpot }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState(200); 
  const [height, setHeight] = useState(0); 
  const [isHtml, setIsHtml] = useState(false);
  const descriptionRef = useRef(null);

  const updatePosition = useCallback(() => {
    const labelElement = document.getElementById(`label-${hotSpot.uuid}`);
    const canvasContainer = document.querySelector('.canvasContainer'); 

    if (labelElement && canvasContainer) {
      const labelRect = labelElement.getBoundingClientRect(); 
      const containerRect = canvasContainer.getBoundingClientRect(); 

      let x = 0;
      let y = 0;

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

  // Recalculate the width and height when the description (especially HTML) is rendered
  useLayoutEffect(() => {
    const element = descriptionRef.current;

    if (element) {
      const { width: initialWidth, height: initialHeight } = element.getBoundingClientRect();
      setWidth(initialWidth);
      setHeight(initialHeight); 

      hotSpot.updateDescriptionWH(initialWidth, initialHeight);
    }
  }, [hotSpot, isHtml]);

  useLayoutEffect(() => {
    updatePosition();
    hotSpot.addObserver({ update: updatePosition });
    return () => {
      hotSpot.removeObserver({ update: updatePosition });
    };
  }, [hotSpot, updatePosition]);

  useLayoutEffect(() => {
    const element = descriptionRef.current;

    if (!element) return;

    interact(element).resizable({
      edges: { left: false, right: true, bottom: false, top: false }, 
      listeners: {
        move(event) {
          let { width: newWidth } = event.rect;

          if (newWidth < 150) newWidth = 150; 
          if (newWidth > 600) newWidth = 600;

          setWidth(newWidth);
          setHeight(element.offsetHeight);

          hotSpot.updateDescriptionWH(newWidth, element.offsetHeight); 
        }
      }
    });

    return () => {
      interact(element).unset(); 
    };
  }, [hotSpot]);

  // Check if the description is HTML when the component mounts or when hotSpot.description.text changes
  useEffect(() => {
    const descriptionText = hotSpot.description.text;
    const isHtmlContent = /<\/?[a-z][\s\S]*>/i.test(descriptionText); 
    setIsHtml(isHtmlContent);
  }, [hotSpot.description.text]);

  // Recalculate position after HTML content has rendered
  useEffect(() => {
    if (isHtml) {
      updatePosition();  // Recalculate position once HTML has rendered
    }
  }, [isHtml, updatePosition]);

  const renderDescription = () => {
    const descriptionText = hotSpot.description.text;

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
        padding: isHtml ? '0' : '8px', 
      }}
      className="text-black shadow-md select-none"
    >
      {renderDescription()}
    </div>
  );
}

export default Description;
