'use client';

import {EmbeddedComponentWrapper} from '@/app/hooks/EmbeddedComponentWrapper';
import {
  ToolsPanelProvider,
  useToolsContext,
} from '@/app/hooks/ToolsPanelProvider';
import {OnboardingOptionsProvider} from '@/app/hooks/OnboardingOptionsProvider';
import OnboardingToolsPanel from '@/app/components/OnboardingToolsPanel';
import {Button} from '@/components/ui/button';
import {Sparkles} from 'lucide-react';

function OnboardingContent({children}: {children: React.ReactNode}) {
  const {open, handleOpenChange} = useToolsContext();

  return (
    <>
      {/* Tools Panel - fixed bottom left popover */}
      <div
        className={`${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}
          fixed bottom-4 left-4 z-50 w-[320px] overflow-hidden rounded-xl border bg-screen-foreground shadow-lg transition duration-300 ease-in-out`}
      >
        <OnboardingToolsPanel />
      </div>

      {/* Open tools button */}
      {!open && (
        <Button
          variant="secondary"
          className="fixed bottom-4 left-4 z-40 gap-1.5 px-3 py-2 text-sm shadow-md"
          onClick={() => handleOpenChange(true)}
        >
          <Sparkles size={16} />
          Open tools
        </Button>
      )}

      {/* Page content */}
      {children}
    </>
  );
}

export default function OnboardingWithTools({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EmbeddedComponentWrapper>
      <ToolsPanelProvider>
        <OnboardingOptionsProvider>
          <OnboardingContent>{children}</OnboardingContent>
        </OnboardingOptionsProvider>
      </ToolsPanelProvider>
    </EmbeddedComponentWrapper>
  );
}
