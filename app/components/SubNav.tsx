import {Button} from '@/components/ui/button';

type SubNavProps = {
  items: SubNavItem[];
  page: string;
  setPage: (page: string) => void;
};

type SubNavItem = {
  key: string;
  label: string;
};

export default function SubNav({items, page, setPage}: SubNavProps) {
  return (
    <div className="flex space-x-1">
      {items.map(({key, label}) => (
        <Button
          key={key}
          onClick={() => setPage(key)}
          variant={`${page !== key ? 'ghost' : 'default'}`}
          className={`${
            page === key ? 'bg-white text-primary shadow-md' : ''
          } font-bold`}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
