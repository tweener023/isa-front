import React from 'react';
import '../styles/errorWindow.scss';

const ErrorWindow = ({ message }) => {
  return (
    <div className="error-window">
      <p className="error-message">{message}</p>
    </div>
  );
};

export default ErrorWindow;
