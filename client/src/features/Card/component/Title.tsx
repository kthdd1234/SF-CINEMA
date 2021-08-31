import React from 'react';

interface ITitle {
   title?: string
}

const Title = ({ title }:ITitle) => {
   return <div className="card-title">{title}</div>;
};

export default Title;
