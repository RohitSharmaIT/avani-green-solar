import React from 'react';
import { useApp } from '../../context/AppContext';

export default function Toast() {
  const { toastMessage } = useApp();

  return (
    <div className={`toast ${toastMessage ? 'show' : ''}`} role="alert" aria-live="assertive">
      {toastMessage}
    </div>
  );
}
