import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({children, className}: ContainerProps) => {
  return (
    <div className={`${className} rounded-lg border  bg-white p-4`}>
      {children}
    </div>
  );
};

export default Container;
