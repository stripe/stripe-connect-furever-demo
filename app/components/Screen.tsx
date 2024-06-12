import Nav from '@/app/components/Nav';
import Container from '@/app/components/Container';
import {
  useToolsContext,
  ToolsPanelProvider,
} from '@/app/hooks/ToolsPanelProvider';
import ToolsPanel from '@/app/components/ToolsPanel';
import OnboardingDialog from '../components/OnboardingDialog';
import {useSettings} from '../hooks/useSettings';

export default function Screen({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {open, handleOpenChange} = useToolsContext();
  const {theme} = useSettings();

  return (
    <div className={`flex grow flex-row text-primary`}>
      {open && (
        <div className="h-[823-px] w-[318px] border bg-screen-foreground">
          <ToolsPanel />
        </div>
      )}
      <div
        className={`h-full w-auto grow ${theme == 'light' ? 'bg-dot-grid' : 'bg-gray-700'}`}
      >
        <div
          className={`duration-750 flex transition ease-in-out ${open ? 'h-screen w-[full] scale-[.9] flex-col overflow-auto rounded-xl border-2 shadow-xl' : 'h-full min-h-screen w-full flex-col sm:flex-row'} ${theme == 'light' ? 'bg-paw-pattern' : 'border-black bg-screen-background'}`}
        >
          <Nav />
          <div className="mt-[74px] flex flex-1 justify-center p-3 pb-20 sm:ml-52 sm:mt-0 sm:p-8 lg:ml-64">
            <div className="flex h-[442px]  grow flex-col gap-y-4 md:gap-y-5">
              <OnboardingDialog />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
