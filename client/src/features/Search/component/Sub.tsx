import React from 'react';

interface ISub {
   sub: string;
}

const Sub = ({ sub }: ISub) => {
   return <span className="search-head-sub">{sub}</span>;
};

export default Sub;
