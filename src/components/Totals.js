import React, { useState, useEffect } from 'react';

//number validation and also have to add in the value field and such
//add missing value between sum of all people and final/pre

const Totals = ({ preTotal, setPreTotal, postTotal, setPostTotal, missingAmount }) => {
  // using a string instead of 0 or null because 0 would require deleting 0 then typing number
  // null gives us an error because value in <input> shouldn't be null
  const [showBadTotalMessage, setShowBadTotalMessage] = useState(false);

  useEffect(() => {
    if (preTotal > postTotal) {
      setShowBadTotalMessage(true);
    }
    else {
      setShowBadTotalMessage(false);
    }
  }, [preTotal, postTotal])

  return (
    <div className="ui equal width form">
      <div className="fields">
        <div className="field">
          <label>Pre Tip and Tax Total</label>
          <input
            value={preTotal}
            onChange={e => setPreTotal(e.target.value)}
            type="number"
            pattern="[0-9]*"
            placeholder="0"
          />
          {showBadTotalMessage ? <div className="ui pointing red basic label fluid">
            Pre-total must be less than final total
          </div> : null}
        </div>
        <div className="field">
          <label>Final Total</label>
          <input
            value={postTotal}
            onChange={e => setPostTotal(e.target.value)}
            type="number"
            pattern="[0-9]*"
            placeholder="0"
          />
        </div>
        <div className="field">
          <label>Missing Amount</label>
          <input
            value={missingAmount}
            type="number"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default Totals;
