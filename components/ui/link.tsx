import * as React from 'react';

import {cn} from '@/lib/utils';

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({className, type, ...props}, ref) => {
    return (
      <a
        type={type}
        className={cn('text-accent', className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Link.displayName = 'Link';

export {Link};
