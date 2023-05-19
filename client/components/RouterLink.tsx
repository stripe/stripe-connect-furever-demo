import React from 'react';
import {Link, LinkProps, useLocation} from 'react-router-dom';

/**
 * This component wraps the Link component from react-router-dom
 * in order to preserve the URL search params when
 * navigating between pages.
 */
const RouterLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    const {search} = useLocation();
    const {to, children, ...rest} = props;
    return (
      <Link to={to + search} ref={ref} {...rest}>
        {children}
      </Link>
    );
  }
);

export default RouterLink;
