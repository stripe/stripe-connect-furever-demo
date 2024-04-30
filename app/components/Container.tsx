import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({children, className}: ContainerProps) => {
  return (
    <div className={`rounded-lg border bg-white p-4 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
