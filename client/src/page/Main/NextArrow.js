import React from 'react';

export default function NextArrow(props) {
   const { className, onClick } = props;
   return (
      <div
         className={className}
         style={{
            boxSizing: 'border-box',
            display: 'block',
            padding: '5pt 20pt 19.7pt 5pt',
            background: 'rgb(220, 214, 214)',
            border: '3px solid rgb(220, 214, 214)',
            borderRadius: '20px',
            margin: '0 -30px 0 0',
         }}
         onClick={onClick}
      />
   );
}
