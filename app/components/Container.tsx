import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({children}: ContainerProps) => {
  return <div className="bg-white shadow-md p-5 rounded-lg">{children}</div>;
};

export default Container;
