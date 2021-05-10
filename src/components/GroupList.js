import React, { useState, useEffect } from 'react';
import Person from './Person';

//add an add button for the entire list

const GroupList = () => {
  const [people, setPeople] = useState(["Jeremie"])

  const renderedList = people.map((person) => {
    return (
      <Person name={person} />
    );
  });

  return (
    <div className="ui middle aligned divided list">
      {renderedList}
    </div>
  );
};

export default GroupList;
