import React from 'react';
import './Modal-summary-subs.css';

export default function ModalSummarySubs({ sub, i }) {
   return (
      <li className="Modal-summary-each-sub">
         {sub}
         <span className="Modal-summary-each-boundary">
            {i === 4 ? null : ` ꒐ `}
         </span>
      </li>
   );
}
