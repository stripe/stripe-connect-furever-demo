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
    <div className="flex grow flex-row text-primary transition-colors">
      <div
        className={`h-full w-auto grow ${theme == 'light' ? 'bg-dot-grid bg-[size:224px]' : 'bg-dot-grid-dark bg-[size:224px]'}`}
      >
        {/* Tools Panel container */}
        <div
          className={`${open ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:-translate-x-full md:translate-y-0'}
          fixed bottom-0 z-[50] w-full overflow-hidden rounded-t-2xl bg-screen-foreground shadow-[0px_-4px_32px_rgba(0,0,0,0.15)] transition duration-500 ease-in-out md:h-screen md:w-[300px] md:rounded-none md:border-r md:shadow-none`}
        >
          <ToolsPanel />
        </div>

        {/* Furever site container */}
        <div
          className={`h-screen origin-left overflow-scroll transition duration-500 ease-in-out
            ${open ? 'shadow-xl md:translate-x-[325px] md:scale-[0.6] md:rounded-xl md:border lg:scale-[0.66] xl:scale-[0.73]' : 'h-full min-h-screen w-full flex-col sm:flex-row'}
            ${theme == 'light' ? 'bg-paw-pattern bg-[size:426px]' : 'bg-screen-background'}`}
        >
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
