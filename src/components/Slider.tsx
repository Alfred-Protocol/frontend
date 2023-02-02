import React, { useCallback, useEffect, useState, useRef } from 'react';

import PropTypes from 'prop-types';

interface Props {
  min: number;
  max: number;
  onChange: ({ min, max }: { min: number; max: number }) => void;
}

const MultiRangeSlider = ({ min, max, onChange }: Props) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<any>(null);
  const maxValRef = useRef<any>(null);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        // @ts-ignore
        range.current.style.left = `${minPercent}%`;
        // @ts-ignore
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        // @ts-ignore
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="h-screen flex items-center justify-center">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        // className={classnames('thumb thumb--zindex-3', {
        //   'thumb--zindex-5': minVal > max - 100,
        // })}
        className="pointer-events-none absolute h-0 w-48"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className="thumb thumb--zindex-4 pointer-events-none absolute h-0 w-48"
      />

      <div className="relative w-48">
        <div className="slider__track absolute rounded-sm h-1 bg-gray-400 w-full" />
        <div
          ref={range}
          className="slider__range absolute rounded-sm h-1 bg-teal-200"
        />
        <div className="slider__left-value absolute text-gray-300 text-xs mt-5">
          {minVal}
        </div>
        <div className="slider__right-value absolute text-gray-300 text-xs mt-5 ">
          {maxVal}
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
