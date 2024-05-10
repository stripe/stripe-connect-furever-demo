import {useEmbeddedComponentBorder} from '@/app/hooks/EmbeddedComponentBorderProvider';

const NotificationBannerContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {enableBorder} = useEmbeddedComponentBorder();

  return (
    <div
      className={`rounded-md border bg-white ${enableBorder ? 'p-[6px]' : ' p-[8px] pb-[12px]'}`}
    >
      {children}
    </div>
  );
};

export default NotificationBannerContainer;
