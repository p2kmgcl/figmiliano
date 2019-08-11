import React from 'react';

export const Select = (props) => (
  <select
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
