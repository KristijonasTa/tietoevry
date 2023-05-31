import React from 'react';
import './Button.scss';

export default function Button({ className, title, onClick }) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {title}
    </button>
  );
}
