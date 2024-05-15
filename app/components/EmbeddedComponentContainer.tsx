import {useEmbeddedComponentBorder} from '@/app/hooks/EmbeddedComponentBorderProvider';

const EmbeddedComponentContainer = ({
  children, className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const {enableBorder} = useEmbeddedComponentBorder();

  return (
    <div
      className={`${enableBorder ? 'rounded-lg border-2 border-dashed border-[#7F81FA] p-[4px]' : 'p-[6px]'} transition-border duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default EmbeddedComponentContainer;
