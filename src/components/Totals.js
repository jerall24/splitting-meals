import React, { useState, useEffect } from 'react';

//make sure post is more than pre
//number validation and also have to add in the value field and such

const Totals = () => {
  const [preTotal, setPreTotal] = useState(null);
  const [postTotal, setPostTotal] = useState(null);
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
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};

export default Totals;
