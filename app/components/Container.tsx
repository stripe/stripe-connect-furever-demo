import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({children, className}: ContainerProps) => {
  return (
    <div className={`rounded-lg bg-white py-4 px-4 shadow-md ${className}`}>
      {children}
    </div>
  );
};

export default Container;
