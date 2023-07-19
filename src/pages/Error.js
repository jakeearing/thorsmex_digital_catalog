import React from 'react';
import '../assets/styles/error.css';

export default function Error(props) {
  const { errorMessage } = props;

  return (
    <div className="error-container">
      <h1>{errorMessage}</h1>
    </div>
  );
}
