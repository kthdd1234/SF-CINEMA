import React from 'react';

interface IPerson {
   director: string;
   actors: string;
}

const Person = ({ director, actors }: IPerson) => {
   const persons = [
      { sub: '감독', person: director },
      { sub: '출연', person: actors },
   ];

   return (
      <div className="movie-contents-person">
         {persons.map((data) => (
            <div>
               <strong className="movie-contents-person-sub">{data.sub}</strong>
               <span>{data.person}</span>
            </div>
         ))}
      </div>
   );
};

export default Person;
