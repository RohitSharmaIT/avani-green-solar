import React from 'react';

export default function Disclaimer({ children }) {
  return (
    <div className="disclaimer">
      <strong>Note: </strong>{children}
    </div>
  );
}
