import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({children, className}: ContainerProps) => {
  return (
    <div className={`rounded-lg bg-white p-5 shadow-md ${className}`}>
      {children}
    </div>
  );
};

export default Container;
