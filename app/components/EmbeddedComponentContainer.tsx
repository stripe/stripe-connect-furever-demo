import {useEmbeddedComponentBorder} from '@/app/hooks/EmbeddedComponentBorderProvider';
import { ChevronRight } from 'lucide-react';

const EmbeddedComponentContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const {enableBorder} = useEmbeddedComponentBorder();

  const ComponentDetails = () => {
    if (!enableBorder) { return; }

    return (
      <div className="absolute top-1 z-50 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-150">
        <div className="bg-[#7F81FA] shadow-lg text-white font-mono font-bold rounded py-0.5 px-1.5">Component name</div>
        <a
          className="bg-white shadow-lg rounded font-medium py-0.5 px-1.5 flex gap-1 items-center hover:opacity-70"
          href=""
          target="_blank">
          View in docs
          <ChevronRight size="16" />
        </a>
      </div>
    );
  };

  return (
    <div
      className={`${enableBorder ? 'rounded-lg border-2 border-dashed border-[#7F81FA] p-[4px]' : 'p-[6px]'} transition-border duration-200 relative group ${className}`}
    >
      <ComponentDetails />
      {children}
    </div>
  );
};

export default EmbeddedComponentContainer;
