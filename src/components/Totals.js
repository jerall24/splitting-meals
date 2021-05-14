import React, { useState, useEffect } from 'react';

//number validation and also have to add in the value field and such
//add missing value between sum of all people and final/pre

const Totals = ({ preTotal, setPreTotal, postTotal, setPostTotal, missingAmount }) => {
  // using a string instead of 0 or null because 0 would require deleting 0 then typing number
  // null gives us an error because value in <input> shouldn't be null
  const [showBadTotalMessage, setShowBadTotalMessage] = useState(false);
  const [showSuggestedTip, setShowSuggestedTip] = useState(false);
  const [debouncedPreTotal, setDebouncedPreTotal] = useState(preTotal);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedPreTotal(Number(preTotal));
    }, 500);

    return () => {
      clearTimeout(timerId)
    };
  }, [preTotal]);

  useEffect(() => {
    if (debouncedPreTotal > 0) {
      setShowSuggestedTip(true);
    }
    else {
      setShowSuggestedTip(false);
    }
  }, [debouncedPreTotal]);

  useEffect(() => {
    if (preTotal > postTotal) {
      setShowBadTotalMessage(true);
    }
    else {
      setShowBadTotalMessage(false);
    }
  }, [preTotal, postTotal])

  function suggestedTip(percent) {
    return Number(debouncedPreTotal)*(1+percent);
  }

  const tips = [.15, .18, .2, .25]

  const tipButtons = tips.map((tip) => {
    return (
      <div style={{position: "relative"}} onClick={() => {setPostTotal(suggestedTip(tip).toFixed(2)); setShowBadTotalMessage(false)}} className="ui mini grey button">
        ${suggestedTip(tip).toFixed(2)}
        <div className="floating ui mini blue label">{tip*100}%</div>
      </div>
    )
  })

  return (
    <div className="ui equal width form">
      <div className="fields">
        <div className="field">
          <label>Pre Tip and Tax Total</label>
          <input
            value={preTotal}
            onChange={e => setPreTotal(e.target.value)}
            type="number"
            placeholder="0"
          />
          {showBadTotalMessage ? <div className="ui pointing red basic label fluid">
            Pre-total must be less than final total
          </div> : null}
          {showSuggestedTip ?
            <div className="ui container-fluid">
              <div className="ui label">Tips: {tipButtons}</div>

            </div> : null
          }
        </div>
        <div className="field">
          <label>Final Total</label>
          <input
            value={postTotal}
            onChange={e => setPostTotal(e.target.value)}
            type="number"
            placeholder="0"
          />
        </div>
        <div className="field">
          <label>Missing Amount</label>
          <input
            value={missingAmount.toFixed(2)}
            type="number"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default Totals;
