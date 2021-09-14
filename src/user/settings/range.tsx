import React, { FunctionComponent } from 'react';
import { Range } from 'react-range';
import './range.css';

const RangeComponent: FunctionComponent<{ range: [number, number], values: [number, number], setValues: (values: [number, number]) => void }> = ({ range, values, setValues }) => {
  return (
    <div className="user-settings-range">
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
              className="user-settings-range__outer"
            >
              <div
                ref={props.ref}
                className="user-settings-range__inner"
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged, index }) => (
            <div
              {...props}
              className="user-settings-range__thumb"
            >
              {values[index]}
            </div>
          )}
        />
      </div>
  );
}

export default RangeComponent;
