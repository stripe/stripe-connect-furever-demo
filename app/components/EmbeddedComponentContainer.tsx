import {useEmbeddedComponentBorder} from '@/app/hooks/EmbeddedComponentBorderProvider';

const EmbeddedComponentContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {enableBorder} = useEmbeddedComponentBorder();

  return (
    <div
      className={`${enableBorder ? 'border-2 border-dashed border-secondary p-[6px]' : 'p-[8px]'} transition-border duration-300 ease-in-out`}
    >
      {children}
    </div>
  );
};

export default EmbeddedComponentContainer;
