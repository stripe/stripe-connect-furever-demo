'use client';

import {X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';
import {Sparkles} from 'lucide-react';
import {useEmbeddedComponentBorder} from '../hooks/EmbeddedComponentBorderProvider';
import {useToolsContext} from '../hooks/ToolsPanelProvider';
import LocaleSelector from './Tools/LocaleSelector';
import ThemePicker from './Tools/ThemePicker';
import BrandSettingsModal from './BrandSettingsModal';

const OnboardingToolsPanel = () => {
  const {handleEnableBorderChange, enableBorder} = useEmbeddedComponentBorder();
  const {handleOpenChange} = useToolsContext();

  return (
    <div className="flex w-full flex-col bg-tools-background p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2 text-lg font-bold text-primary">
          <Sparkles size={20} />
          Tools
        </div>
        <div className="flex items-center gap-2">
          <BrandSettingsModal />
          <Button
            variant="ghost"
            className="px-2"
            onClick={() => handleOpenChange(false)}
          >
            <X size={18} />
          </Button>
        </div>
      </div>
      <div className="my-4 flex flex-col gap-y-4 text-lg font-medium">
        <div className="flex flex-row items-center justify-between rounded-lg">
          <Label className="text-left" htmlFor="outline">
            Component outlines
          </Label>
          <Switch
            className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-[#EBEEF1]"
            id="outline"
            checked={enableBorder}
            onCheckedChange={() => handleEnableBorderChange(!enableBorder)}
          />
        </div>
        <div className="flex flex-row items-center justify-between">
          <Label className="text-left" htmlFor="theme">
            Theme
          </Label>
          <ThemePicker />
        </div>
        <div className="flex flex-row items-center justify-between">
          <Label className="text-left align-middle" htmlFor="outline">
            Locale
          </Label>
          <LocaleSelector />
        </div>
      </div>
    </div>
  );
};

export default OnboardingToolsPanel;
