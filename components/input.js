import React from 'react';

export const Input = (props) => (
  <input
    style={{
      fontFamily: 'inherit',
      fontSize: '1em',
      flexGrow: 1,
      width: '100%',
      ...(props.style || {}),
    }}
    {...props}
  />
);
