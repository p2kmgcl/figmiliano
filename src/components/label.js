import React from 'react';

export const LabelContent = (props) => (
  <span
    style={{
      display: 'inline-block',
      paddingRight: '1ch',
      whiteSpace: 'nowrap',
      minWidth: '12ch',
      flexShrink: '0',
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
      color: '#b9b9b9',
      margin: '1em 0',
      padding: '0 4px 0 8px',
      ...(props.style || {}),
    }}
    {...props}
  />
);
