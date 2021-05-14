import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './Calculator';
// https://upmostly.com/tutorials/modal-components-react-custom-hooks

const Modal = ({ isShowing, hide, debouncedSum, setDebouncedSum, setSentFromCalc }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay" />
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <Calculator
            setDebouncedSum={setDebouncedSum}
            debouncedSum={debouncedSum}
          />
          <div className="modal-header">
            <button className="ui fluid positive button" data-dismiss="modal" aria-label="Close" onClick={() => {hide(); setSentFromCalc(true)}}>
              Submit/Close
            </button>
          </div>
        </div>
      </div>
  </React.Fragment>, document.body) : null;

export default Modal;
