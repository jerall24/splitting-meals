import React, { useState, useEffect } from 'react';
import './Calculator.css'
//https://codepen.io/chris__sev/pen/jZmpwx - format and css
//eval function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval


//TODO: Make text smaller
//connect to person

const Calculator = ({ debouncedSum, setDebouncedSum }) => {
  const [expression, setExpression] = useState(debouncedSum);
  const [finalAmount, setFinalAmount] = useState(expression);

  function addToExpression(context) {
    setExpression(expression + context)
  }

  function cleanUp(s) {
    if (s[0] === "0") {
      setExpression(1, s.length);
    }
  }

  function handleClick(event) {
    console.log("expression", expression, "event.target.textContent", event.target.textContent);

    switch (event.target.textContent) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
      case "x":
      case "/":
      case "+":
      case "-":
      case ".": {
        setExpression(`${expression}${event.target.textContent}`);
        break;
      }
    }
  }

  useEffect(() => {
    setExpression(finalAmount);
    setDebouncedSum(finalAmount);
  }, [finalAmount])

  return (
    <div className="ui container-fluid segment">
      <div className="calculator">

        <input
          type="text"
          value={expression}
          readOnly
        />

        <div className="calculator-buttons">
          <button onClick={() => setExpression("")} className="calc-button is-clear">C</button>
          <button onClick={() => setExpression(expression.slice(0, expression.length-1))} className="calc-button">
            <i className="ui icon backward"></i>
          </button>
          <button onClick={(e) => setExpression(expression + e.target.textContent)} className="calc-button">/</button>

          <button onClick={(e) => setExpression(expression + e.target.textContent)} className="calc-button">7</button>
          <button onClick={(e) => setExpression(expression + e.target.textContent)} className="calc-button">8</button>
          <button onClick={(e) => setExpression(expression + e.target.textContent)} className="calc-button">9</button>
          <button onClick={(e) => setExpression(expression + e.target.textContent)} className="calc-button">*</button>

          <button onClick={(e) => setExpression(expression + e.target.textContent)} className="calc-button">4</button>
          <button onClick={(e) => setExpression(expression + e.target.textContent)} className="calc-button">5</button>
          <button onClick={(e) => setExpression(expression + e.target.textContent)} className="calc-button">6</button>
          <button onClick={(e) => setExpression(expression + e.target.textContent)} className="calc-button">-</button>

          <button onClick={(e) => setExpression(expression + e.target.textContent)} className="calc-button">1</button>
          <button onClick={(e) => setExpression(expression + e.target.textContent)} className="calc-button">2</button>
          <button onClick={(e) => setExpression(expression + e.target.textContent)} className="calc-button">3</button>
          <button onClick={(e) => setExpression(expression + e.target.textContent)} className="calc-button">+</button>

          <button onClick={(e) => setExpression(expression + e.target.textContent)} className="calc-button is-zero">0</button>
          <button
            onClick={() => {
              cleanUp(expression);
              setFinalAmount(expression === "" ? 0 : eval(expression).toFixed(2));
              setDebouncedSum(finalAmount);
              }
            }
            className="calc-button is-equals">
            <i className="ui icon check"></i>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Calculator;
