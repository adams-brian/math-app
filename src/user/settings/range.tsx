import React, { FunctionComponent } from 'react';
import { Range } from 'react-range';

const RangeComponent: FunctionComponent<{ range: [number, number], values: [number, number], setValues: (values: [number, number]) => void }> = ({ range, values, setValues }) => {
  return (
    <div className="flex flex-col items-center justify-center">
        <Range
          allowOverlap={false}
          values={values}
          step={1}
          min={range[0]}
          max={range[1]}
          onChange={(values) => setValues([values[0], values[1]])}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={props.style}
              className="flex h-12 w-full"
            >
              <div
                ref={props.ref}
                className="bg-white border border-gray-400 h-2 rounded self-center w-full"
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged, index }) => (
            <div
              {...props}
              className="bg-white border border-gray-800 flex h-12 items-center justify-center rounded-xl text-2xl w-12"
            >
              {values[index]}
            </div>
          )}
        />
      </div>
  );
}

export default RangeComponent;
