import React, { useState, useEffect } from 'react';
import Modal from "./Modal";
import useModal from './useModal';
import './App.css';

//add edit button
//show calculator: https://medium.com/@nitinpatel_20236/how-to-build-a-simple-calculator-application-with-react-js-bc10a4568bbd
// add a personName or rename this to PersonRow and make a person file
//TODO: fix sizing

const Person = ({ index, name, people, setPeople, preTotal, postTotal, shared }) => {
  const [rawSum, setRawSum] = useState("");
  const [owedSum, setOwedSum] = useState(0);
  const [debouncedSum, setDebouncedSum] = useState(rawSum);
  const {isShowing, toggle} = useModal();
  const [sentFromCalc, setSentFromCalc] = useState(false);
  const [personName, setPersonName] = useState(name);
  const [debouncedName, setDebouncedName] = useState(personName);

  const removePerson = () => {
    const p = people.slice();
    p.splice(index, 1);
    setPeople(p);
  };

  useEffect(() => {
    const nameTimerId = setTimeout(() => {
      setDebouncedName(personName);
    }, 500);

    return () => {
      clearTimeout(nameTimerId)
    };
  }, [personName]);

  useEffect(() => {
    setPersonName(debouncedName);
    const p = people.slice();
    p[index].name = personName;
    setPeople(p);
  }, [debouncedName]);

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
      setOwedSum((Number(debouncedSum)+shared/(people.length === 0 ? 1 : people.length))/preTotal*postTotal);
      const p = people.slice();
      p[index].raw = Number(debouncedSum);
      setPeople(p);
    }
  }, [debouncedSum, preTotal, postTotal, shared, people.length])

  const showAmount = (sum, setSumFunction) => {
    return (
      <td className="collapsing">
        <div className="ui fluid mini action input">
          <input
            type="text"
            pattern="[0-9]*"
            value={sum}
            className="ui fluid"
            placeholder=""
            onChange={e => {setSumFunction(e.target.value); setSentFromCalc(false)}}
          />
          {/* idk fix this it's not showing the Modal*/}
            <button onClick={toggle} className="ui label button">
              <i className="calculator icon"></i>
            </button>
            <Modal
              isShowing={isShowing}
              hide={toggle}
              setDebouncedSum={setDebouncedSum}
              debouncedSum={debouncedSum}
              setSentFromCalc={setSentFromCalc}
            />
        </div>
      </td>
    );
  };

  return (
    <tr>
      <td className="collapsing">
        <div className="ui fluid mini labeled input">
          <div onClick={removePerson} className="ui red icon label button">
            <i className="trash alternate icon"></i>
          </div>
          <input
            type="text"
            value={personName}
            onChange={e => setPersonName(e.target.value)}
          />
        </div>
      </td>
      {sentFromCalc ? showAmount(debouncedSum, setRawSum) : showAmount(rawSum, setRawSum)}
      <td className="collapsing">
        <div className="ui fluid mini input">
          <input
            type="number"
            value={isNaN(owedSum) ? 0 : owedSum.toFixed(2)}
            readOnly
          />
        </div>
      </td>
    </tr>
  );
};

export default Person;
