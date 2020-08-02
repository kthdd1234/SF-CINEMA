import React from 'react';

function SubjectSummary({ sub, i }) {
   return (
      <li className="movie-summary-each-sub">
         {sub}
         <span className="movie-summary-each-boundary">
            {i === 4 ? null : ` ꒐ `}
         </span>
      </li>
   );
}

export default SubjectSummary;
