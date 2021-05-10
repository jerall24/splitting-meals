import React, { useState, useEffect } from 'react';

//add delete button and edit button
//show calculator: https://medium.com/@nitinpatel_20236/how-to-build-a-simple-calculator-application-with-react-js-bc10a4568bbd
// add a personName or rename this to PersonRow and make a person file

const Person = ({ index, name, people, setPeople, preTotal, postTotal, shared }) => {
  const [rawSum, setRawSum] = useState("");
  const [owedSum, setOwedSum] = useState(0);
  const [debouncedSum, setDebouncedSum] = useState(rawSum);

  const removePerson = () => {
    const p = people.slice();
    p.splice(index, 1);
    setPeople(p);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSum(rawSum);
    }, 500);

    return () => {
      clearTimeout(timerId)
    };
  }, [rawSum]);

  useEffect(() => {
    if (debouncedSum === 0) {
      setOwedSum(0);
    }
    else {
      console.log("people.length", debouncedSum);
      //include shared plates here
      setOwedSum((Number(debouncedSum)+shared/(people.length === 0 ? 1 : people.length))/preTotal*postTotal);
      const p = people.slice();
      p[index].raw = Number(debouncedSum);
      setPeople(p);
    }
  }, [debouncedSum, preTotal, postTotal, shared, people.length])

  const showAmount = (sum, setSumFunction) => {
    return (
      <td className="collapsing">
        <div className="ui fluid action input">
          <input
            type="text"
            pattern="[0-9]*"
            value={sum}
            className="ui fluid"
            placeholder=""
            onChange={e => setSumFunction(e.target.value)}
          />
            <div className="ui label button">
              <i className="calculator icon"></i>
            </div>
        </div>
      </td>
    );
  };

  return (
    <tr>
      <td className="collapsing">
        <h5 className="ui image header">
        <div className="content">
          {name}
        </div>
        </h5>
      </td>
      {showAmount(rawSum, setRawSum)}
      <td className="collapsing">
        <div className="ui fluid input">
          <input
            type="number"
            value={owedSum}
            readOnly
          />
        </div>
      </td>
      <td className="collapsing">
        <button className="ui mini red icon button" onClick={removePerson}>
          <i className="trash alternate icon"></i>
        </button>
      </td>
    </tr>
  );
};

export default Person;
