import React, { useState, useEffect } from 'react';

//https://codepen.io/chris__sev/pen/jZmpwx - format and css
//eval function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval


//TODO: Make text smaller

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

  const border = {
    border: "dotted solid",
    borderWidth: "thin"
  }

  return (
    <div className="ui container-fluid segment">
      <div className="ui centered grid">
        <div className="ui sixteen wide column">
          <div className="ui right fluid labeled input">
            <label htmlFor="amount" className="ui label">$</label>
            <input
              type="text"
              value={expression}
              readOnly/>
          </div>
        </div>

        <div style={border} onClick={() => setExpression("")} className="ui center aligned eight wide blue column">C</div>
        <div style={border} onClick={() => setExpression(expression.slice(0, expression.length-1))} className="ui center aligned four wide column red">
            <i className="ui icon backward"></i>
        </div>
        <div style={border} onClick={(e) => setExpression(expression + e.target.textContent)} className="ui center aligned four wide column grey">/</div>

        <div style={border} onClick={(e) => setExpression(expression + e.target.textContent)} className="ui center aligned four wide column">7</div>
        <div style={border} onClick={(e) => setExpression(expression + e.target.textContent)} className="ui center aligned four wide column">8</div>
        <div style={border} onClick={(e) => setExpression(expression + e.target.textContent)} className="ui center aligned four wide column">9</div>
        <div style={border} onClick={(e) => setExpression(expression + e.target.textContent)} className="ui center aligned four wide column grey">*</div>

        <div style={border} onClick={(e) => setExpression(expression + e.target.textContent)} className="ui center aligned four wide column">4</div>
        <div style={border} onClick={(e) => setExpression(expression + e.target.textContent)} className="ui center aligned four wide column">5</div>
        <div style={border} onClick={(e) => setExpression(expression + e.target.textContent)} className="ui center aligned four wide column">6</div>
        <div style={border} onClick={(e) => setExpression(expression + e.target.textContent)} className="ui center aligned four wide column grey">-</div>

        <div style={border} onClick={(e) => setExpression(expression + e.target.textContent)} className="ui center aligned four wide column">1</div>
        <div style={border} onClick={(e) => setExpression(expression + e.target.textContent)} className="ui center aligned four wide column">2</div>
        <div style={border} onClick={(e) => setExpression(expression + e.target.textContent)} className="ui center aligned four wide column">3</div>
        <div style={border} onClick={(e) => setExpression(expression + e.target.textContent)} className="ui center aligned four wide column grey">+</div>

        <div style={border} onClick={(e) => setExpression(expression + e.target.textContent)} className="ui center aligned eight wide column ">0</div>
        <div style={border} onClick={(e) => setExpression(expression + e.target.textContent)} className="ui center aligned four wide column">.</div>
        <div
          style={border}
          onClick={() => {
            cleanUp(expression);
            setFinalAmount(expression === "" ? 0 : eval(expression).toFixed(2));
            setDebouncedSum(finalAmount);
            }
          }
          className="ui center aligned four wide column green">
            <i className="ui icon check"></i>
          </div>
      </div>

    </div>
  );
};

export default Calculator;
