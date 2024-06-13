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
          `${open ? "md:translate-x-0 translate-y-0" : ""}
          z-[120] fixed bottom-0 md:h-screen w-full md:w-[300px] translate-y-full md:-translate-x-full md:translate-y-0 border-r bg-screen-foreground transition ease-in-out duration-500 shadow-[0px_-4px_32px_rgba(0,0,0,0.2)] md:shadow-none rounded-t-2xl md:rounded-none overflow-hidden`
        }>
          <ToolsPanel />
        </div>
        <div
          className={
            `duration-500 transition ease-in-out origin-left h-screen overflow-scroll
            ${open ? 'md:scale-[0.6] lg:scale-[0.66] xl:scale-[0.73] md:translate-x-[325px] md:border md:rounded-xl shadow-xl' : 'h-full min-h-screen w-full flex-col sm:flex-row'}
            ${theme == 'light' ? 'bg-paw-pattern bg-[size:426px]' : 'border-black bg-screen-background'}`
        }>
          <Nav />
          <div className="mt-[74px] flex flex-1 justify-center p-3 pb-20 sm:ml-52 sm:mt-0 sm:p-8 lg:ml-64">
            <div className="flex grow flex-col gap-y-4 md:gap-y-5">
              <OnboardingDialog />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
