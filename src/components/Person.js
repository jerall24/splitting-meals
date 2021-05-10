import React from 'react';

//add delete button and edit button

const Person = ({name}) => {

  return (
    <div key={name} className="item">
      <div className="right floated content">
        <div className="ui button">Add</div>
      </div>
      <img className="ui avatar image" src="/images/avatar2/small/lena.png" />
      <div className="content">
        {name}
      </div>
    </div>
  );
};

export default Person;
