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
      ...(props.style || {}),
    }}
    {...props}
  />
);
