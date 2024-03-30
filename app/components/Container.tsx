import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({children, className}: ContainerProps) => {
  return (
    <div className={`bg-white shadow-md p-5 rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default Container;
