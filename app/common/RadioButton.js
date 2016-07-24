import React from 'react';
import './radio-button.scss';

function RadioButton({ name, id, label, checked, onChange }) {
  return (
    <span className="radio-button-wrapper spaced">
      <input
        type="radio"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </span>
  );
}

export default RadioButton;