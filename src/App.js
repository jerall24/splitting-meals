import React from 'react';
import Totals from './components/Totals'
import GroupList from './components/GroupList'

const App = () => {
  return (
    <div className="ui container segment">
      <Totals />
      <GroupList />
    </div>
  );
};

export default App;
