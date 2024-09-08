import { useState, useEffect, useCallback } from "react";

function Description({ hotSpot }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleUpdate = useCallback(() => {
        setPosition({ x: hotSpot.description.x, y: hotSpot.description.y });
    }, [hotSpot.description.x, hotSpot.description.y]);

    useEffect(() => {
        hotSpot.addObserver({ update: handleUpdate });
        return () => {
            hotSpot.removeObserver({ update: handleUpdate });
        };
    }, [hotSpot, handleUpdate]);

    return (
        <div style={{ top: position.y, left: position.x }} className="absolute">Description</div>
    );
}

export default Description;
