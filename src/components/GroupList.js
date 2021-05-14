import React, { useState, useEffect } from 'react';
import Person from './Person';
import Shared from './Shared';

//add shared plates

const GroupList = ({ peopleAmount, setPeopleAmount, preTotal, postTotal }) => {
  const [shared, setShared] = useState({name: "Shared", raw: 0});
  const [people, setPeople] = useState([])
  const [countPeople, setCountPeople] = useState(people.length)

  const renderedList = people.map((person, index) => {
    return (
      <Person
        key={index}
        index={index}
        setPeople={setPeople}
        people={people}
        name={person.name}
        preTotal={preTotal}
        postTotal={postTotal}
        shared={shared.raw}
      />
    );
  });

  useEffect(() => {
    const total = () => {
      var t = 0;
      people.forEach((person) => {
        t += person.raw;
      });
      t += shared.raw;
      setPeopleAmount(t);
    }
    total();
  }, [people, shared.raw])

  // useEffect(() => {
  //   console.log("countPeople", shared.raw);
  // })

  useEffect(() => {
    setCountPeople(people.length);
  }, [people.length])

  return (
    <div>
      <div className="ui container-fluid">
        <table className="ui compact celled definition unstackable table">
          <thead className="full-width">
            <tr>
              <th>Person</th>
              <th>Total</th>
              <th>Owed</th>
            </tr>
          </thead>
          <Shared shared={shared} setShared={setShared}/>
          <tbody>
            {renderedList}
          </tbody>
        </table>
        <div className="ui fluid buttons">
          <button
            onClick={() => {setPeople([...people, {name: `Person ${countPeople}`, raw: 0}])}}
            className="ui positive button"
            >Add Person
          </button>
          {/*<button
            onClick={() => {setPeople([])}}
            className="ui negative basic button">
            Clear
          </button>*/}
      </div>
      </div>
    </div>
  );
};

export default GroupList;
