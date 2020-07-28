import React from 'react';
import './Modal-summary.css';

function ModalSummary({ sub, i }) {
   return (
      <li className="Modal-summary-each-sub">
         {sub}
         <span className="Modal-summary-each-boundary">
            {i === 4 ? null : ` ꒐ `}
         </span>
      </li>
   );
}

export default ModalSummary;
