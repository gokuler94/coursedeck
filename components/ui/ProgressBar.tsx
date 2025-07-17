import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-gray-800 h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${clampedValue}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
