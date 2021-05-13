import React, { useState, useEffect } from 'react';
import Totals from './components/Totals';
import GroupList from './components/GroupList';

const App = () => {
  const [preTotal, setPreTotal] = useState("");
  const [postTotal, setPostTotal] = useState("");
  const [missingAmount, setMissingAmount] = useState(0);
  const [peopleAmount, setPeopleAmount] = useState(0);

  useEffect(() => {
    setMissingAmount(preTotal-peopleAmount);
  }, [preTotal, peopleAmount])

  return (
    <div className="ui segment">
      <Totals
        preTotal={preTotal}
        setPreTotal={setPreTotal}
        postTotal={postTotal}
        setPostTotal={setPostTotal}
        missingAmount={missingAmount}
      />
      <GroupList
        peopleAmount={peopleAmount}
        setPeopleAmount={setPeopleAmount}
        preTotal={preTotal}
        postTotal={postTotal}
      />
    </div>
  );
};

export default App;
