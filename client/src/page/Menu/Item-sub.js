import React from 'react';

function itemSub({ sub, i }) {
   return (
      <li className="movie-summary-each-sub">
         {sub}
         <span className="movie-summary-each-boundary">
            {i === 4 ? null : ` ꒐ `}
         </span>
      </li>
   );
}

export default itemSub;
