import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const bannerVariants = cva(
  'flex justify-between w-full py-4 px-8 align-middle sticky top-0 z-50',
  {
    variants: {
      variant: {
        default: 'bg-gray-200 border-gray-300 text-primary-foreground',
        cool_gradient: 'bg-gradient-to-r from-[#9966FF] to-[#11EFE3]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  open: boolean;
}

function Banner({className, variant, open, ...props}: BannerProps) {
  const [bannerOpenAfterAnimation, setBannerOpenAfterAnimation] =
    React.useState(open);
  React.useEffect(() => {
    setTimeout(() => {
      setBannerOpenAfterAnimation(open);
    }, 250);
  }, [open]);
  return (
    <>
      {bannerOpenAfterAnimation ? (
        <div
          className={cn(
            bannerVariants({variant}),
            `duration-250 transition-transform ease-in-out ${open ? 'translate-y-0 transform' : '-translate-y-full transform'}`,
            className
          )}
          {...props}
        />
      ) : null}
    </>
  );
}
Banner.displayName = 'Banner';

export {Banner};
