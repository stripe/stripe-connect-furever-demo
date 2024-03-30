'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

type SubNavProps = {
  base: string;
  routes: SubNavItem[];
};

type SubNavItem = {
  path: string;
  label: string;
};

export default function SubNav({base, routes}: SubNavProps) {
  const pathname = usePathname();

  return (
    <div className="flex space-x-2">
      {routes.map(({path, label}, index) => {
        return (
          <Link
            key={index}
            href={path}
            className={`${
              path === pathname
                ? 'bg-white font-bold text-secondary shadow-md'
                : 'font-medium'
            } rounded-md p-2`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
