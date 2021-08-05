import React, { FunctionComponent } from 'react';
import { Range } from 'react-range';
import './range.css';

const RangeComponent: FunctionComponent<{ values: [number, number], setValues: (values: [number, number]) => void }> = ({ values, setValues }) => {
  return (
    <div className="user-settings-range">
        <Range
          allowOverlap={false}
          values={values}
          step={1}
          min={1}
          max={12}
          onChange={(values) => setValues([values[0], values[1]])}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={props.style}
              className="user-settings-range-outer"
            >
              <div
                ref={props.ref}
                className="user-settings-range-inner"
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged, index }) => (
            <div
              {...props}
              className="user-settings-range-thumb"
            >
              {values[index]}
            </div>
          )}
        />
      </div>
  );
}

export default RangeComponent;
