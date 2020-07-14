import React from 'react';

export default function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        display: 'block',
        padding: '10px',
        background: 'silver',
        borderRadius: '20px',
        margin: '0 -30px 0',
      }}
      onClick={onClick}
    />
  );
}
