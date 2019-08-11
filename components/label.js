import React from 'react';

export const LabelContent = (props) => (
  <span
    style={{
      display: 'inline-block',
      paddingRight: '1ch',
      whiteSpace: 'nowrap',
      minWidth: '10ch',
      ...(props.style || {}),
    }}
    {...props}
  />
);

export const Label = (props) => (
  <label
    style={{
      display: 'flex',
      alignItems: 'center',
      margin: '1em 0',
      padding: '0 4px 0 8px',
      ...(props.style || {}),
    }}
    {...props}
  />
);
