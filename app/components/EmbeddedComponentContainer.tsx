import {useEmbeddedComponentBorder} from '@/app/hooks/EmbeddedComponentBorderProvider';

const EmbeddedComponentContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {enableBorder} = useEmbeddedComponentBorder();

  return (
    <div
      className={`${enableBorder ? 'rounded-lg border-2 border-[#7F81FA] p-[4px] border-dashed' : 'p-[6px]'} transition-border duration-200`}
    >
      {children}
    </div>
  );
};

export default EmbeddedComponentContainer;
