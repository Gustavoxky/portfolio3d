import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-blue-700 border-opacity-25 border-solid h-16 w-16"></div>
    </div>
  );
};

export default Loader;
