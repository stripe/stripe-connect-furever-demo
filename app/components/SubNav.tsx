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
              path === pathname ? 'bg-white text-secondary font-bold shadow-md' : 'font-medium hover:bg-white/80'
            } p-2 rounded-md transition`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
