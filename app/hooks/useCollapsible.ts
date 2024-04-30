import * as React from 'react';
import {ChevronUp, ChevronDown} from 'lucide-react';

export const useCollapsible = () => {
  const [isOpen, setOpen] = React.useState(false);

  return {
    open: isOpen,
  };
};
