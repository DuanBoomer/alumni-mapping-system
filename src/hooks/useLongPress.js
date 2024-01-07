import { useState, useRef } from 'react';

export default function useLongPress({ onClick, onLongPress }) {
    const [action, setAction] = useState();

    const timerRef = useRef();
    const isLongPress = useRef();

    function startPressTimer() {
        isLongPress.current = false;
        timerRef.current = setTimeout(() => {
            isLongPress.current = true;
            setAction('longpress');
            onLongPress()
        }, 500)
    }

    function handleOnClick(e) {
        // console.log('handleOnClick');
        if (isLongPress.current) {
            // console.log('Is long press - not continuing.');
            return;
        }
        setAction('click')
        onClick()
    }

    function handleOnMouseDown() {
        // console.log('handleOnMouseDown');
        startPressTimer();
    }

    function handleOnMouseUp() {
        // console.log('handleOnMouseUp');
        clearTimeout(timerRef.current);
    }

    function handleOnTouchStart() {
        // console.log('handleOnTouchStart');
        startPressTimer();
    }

    function handleOnTouchEnd() {
        if (action === 'longpress') return;
        // console.log('handleOnTouchEnd');
        clearTimeout(timerRef.current);
    }

    return {
        action,
        handlers: {
            onClick: handleOnClick,
            onMouseDown: handleOnMouseDown,
            onMouseUp: handleOnMouseUp,
            onTouchStart: handleOnTouchStart,
            onTouchEnd: handleOnTouchEnd
        }
    }
}