import React from 'react';

const Title = ({ title }) => {
  return (
    <p className="text-2x1 2x1:text-3x1 font-semiboldtext-gray-600 dark:text-gray-500 mb-5">
      {title}
    </p>
  );
};

export default Title;
