import * as React from 'react';

export interface CollapsibleProps {
  open: boolean;
  children: React.ReactNode;
}

const Collapsible = React.forwardRef<HTMLInputElement, CollapsibleProps>(
  ({open, children, ..._props}, _ref) => {
    return <>{open && children}</>;
  }
);
Collapsible.displayName = 'Collapsible';

export {Collapsible};
