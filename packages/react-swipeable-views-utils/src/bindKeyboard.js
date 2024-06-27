import React, { useCallback, useEffect, useState } from "react";
import keycode from "keycode";
import { mod } from "@herobalancer/react-swipeable-views-core";

const bindKeyboard = (MyComponent) => {
  return (props) => {
    const { axis = 'x', children, index: indexProp, onChangeIndex, slideCount, ...other } = props;

    const [index, setIndex] = useState(indexProp || 0);

    useEffect(() => {
      if (typeof indexProp === 'number' && indexProp !== index) {
        setIndex(indexProp);
      }
    }, [indexProp, index]);

    const handleKeyDown = useCallback((event) => {
      let action = null;

      switch (keycode(event)) {
        case 'page down':
        case 'down':
          if (axis === 'y') action = 'decrease';
          else if (axis === 'y-reverse') action = 'increase';
          break;

        case 'left':
          if (axis === 'x') action = 'decrease';
          else if (axis === 'x-reverse') action = 'increase';
          break;

        case 'page up':
        case 'up':
          if (axis === 'y') action = 'increase';
          else if (axis === 'y-reverse') action = 'decrease';
          break;

        case 'right':
          if (axis === 'x') action = 'increase';
          else if (axis === 'x-reverse') action = 'decrease';
          break;

        default:
          break;
      }

      if (action) {
        const indexLatest = index;
        let indexNew = indexLatest;

        if (action === 'increase') {
          indexNew += 1;
        } else {
          indexNew -= 1;
        }

        if (slideCount || children) {
          indexNew = mod(indexNew, slideCount || React.Children.count(children));
        }

        if (indexProp === undefined) {
          setIndex(indexNew);
        }

        if (onChangeIndex) {
          onChangeIndex(indexNew, indexLatest);
        }
      }
    }, [axis, children, index, indexProp, onChangeIndex, slideCount]);

    const handleChangeIndex = useCallback((newIndex, indexLatest, meta) => {
      if (indexProp === undefined) {
        setIndex(newIndex);
      }

      if (onChangeIndex) {
        onChangeIndex(newIndex, indexLatest, meta);
      }
    }, [indexProp, onChangeIndex]);

    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [handleKeyDown]);

    return (
        <MyComponent index={index} onChangeIndex={handleChangeIndex} {...other} />
    );
  };
};

export default bindKeyboard;
