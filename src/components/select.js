import React from 'react';

export const Select = (props) => (
  <select
    style={{
      fontFamily: 'inherit',
      fontSize: '1em',
      flexGrow: 1,
      width: '100%',
      border: 'solid thin #ebebeb',
      borderRadius: '2px',
      padding: '0.4rem 0.5rem',
      ...(props.style || {}),
    }}
    {...props}
  />
);
