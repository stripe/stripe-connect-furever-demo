import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({children, className}: ContainerProps) => {
  return (
    <div className={`p-4 border rounded-lg bg-white ${className}`}>
      {children}
    </div>
  );
};

export default Container;
