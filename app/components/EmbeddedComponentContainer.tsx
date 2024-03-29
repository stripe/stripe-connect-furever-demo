import {useEmbeddedComponentBorder} from '@/app/hooks/EmbeddedComponentBorderProvider';

const EmbeddedComponentContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {enableBorder} = useEmbeddedComponentBorder();

  return (
    <div
      className={`${enableBorder ? 'border-2 p-[6px] border-secondary border-dashed' : 'p-[8px]'} transition-border ease-in-out duration-300`}
    >
      {children}
    </div>
  );
};

export default EmbeddedComponentContainer;
