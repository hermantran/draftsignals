import React from 'react';
import './checkbox.scss';

function Checkbox({ id, label, checked, onChange }) {
  return (
    <span className="checkbox-wrapper spaced">
      <input
        type="checkbox"
        name={id}
        id={id}
        className="filled-in"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </span>
  );
}

export default Checkbox;