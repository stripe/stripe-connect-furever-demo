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
    <div className="flex grow flex-row text-primary">
      <div
        className={`h-full w-auto grow ${theme == 'light' ? 'bg-dot-grid bg-[size:1300px]' : 'bg-gray-700'}`}
      >
        <div className={
          `${open ? "translate-x-0" : ""}
          fixed h-screen w-[300px] -translate-x-full border-r bg-screen-foreground transition ease-in-out duration-500`
        }>
          <ToolsPanel />
        </div>
        <div className={`${open ? "w-[calc(100%-320px)] ml-[320px]" : "w-full"} transition-all duration-500`}>
          <div
            className={
              `duration-500 transition ease-in-out origin-center
              ${open ? 'h-screen scale-[0.86] border flex-col overflow-auto rounded-xl shadow-xl' : 'h-full min-h-screen w-full flex-col sm:flex-row'}
              ${theme == 'light' ? 'bg-paw-pattern bg-[size:426px]' : 'border-black bg-screen-background'}`
          }>
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
    </div>
  );
}
