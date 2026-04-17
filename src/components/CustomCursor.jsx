import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isActive, setIsActive] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const onMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const onMouseDown = () => setIsActive(true);
        const onMouseUp = () => setIsActive(false);

        const onMouseOver = (e) => {
            if (
                e.target.tagName === 'A' ||
                e.target.tagName === 'BUTTON' ||
                e.target.closest('button') ||
                e.target.closest('a') ||
                window.getComputedStyle(e.target).cursor === 'pointer'
            ) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        };

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
        };
    }, []);

    return (
        <div
            className={`custom-cursor ${isActive ? 'active' : ''} ${!isVisible ? 'hidden' : ''}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <div className="custom-cursor-dot"></div>
        </div>
    );
};

export default CustomCursor;
