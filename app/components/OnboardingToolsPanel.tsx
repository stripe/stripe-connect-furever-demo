'use client';

import {X, FileIcon} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';
import {Sparkles} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {useEmbeddedComponentBorder} from '../hooks/EmbeddedComponentBorderProvider';
import {useToolsContext} from '../hooks/ToolsPanelProvider';
import {
  useOnboardingOptions,
  REQUIREMENT_OPTIONS,
  RequirementsMode,
} from '../hooks/OnboardingOptionsProvider';
import LocaleSelector from './Tools/LocaleSelector';
import ThemePicker from './Tools/ThemePicker';
import BrandSettingsModal from './BrandSettingsModal';

const OnboardingToolsPanel = () => {
  const {handleEnableBorderChange, enableBorder} = useEmbeddedComponentBorder();
  const {handleOpenChange} = useToolsContext();
  const {
    requirementsMode,
    selectedRequirements,
    setRequirementsMode,
    setSelectedRequirements,
  } = useOnboardingOptions();

  const handleModeChange = (value: string) => {
    setRequirementsMode(value as RequirementsMode);
  };

  const handleRequirementToggle = (value: string) => {
    if (selectedRequirements.includes(value)) {
      setSelectedRequirements(selectedRequirements.filter((r) => r !== value));
    } else {
      setSelectedRequirements([...selectedRequirements, value]);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 bg-tools-background p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2 text-lg font-bold text-primary">
          <Sparkles size={20} />
          Tools
        </div>
        <div className="flex items-center gap-2">
          <BrandSettingsModal />
          <Button
            variant="ghost"
            className="-mr-1.5 p-1.5"
            onClick={() => handleOpenChange(false)}
          >
            <X size={18} />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 text-lg font-medium">
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
      <hr />
      <div>
        <div className="text-md flex items-center gap-x-2 font-bold text-primary">
          <FileIcon size={16} />
          Collection options
        </div>
        <p className="mt-1 text-sm text-secondary">
          Control which requirements are collected during onboarding.
        </p>
        <div className="mt-3 flex flex-col gap-y-3">
          <div className="flex flex-row items-center justify-between">
            <Label className="text-sm font-medium" htmlFor="requirements-mode">
              Requirements
            </Label>
            <Select value={requirementsMode} onValueChange={handleModeChange}>
              <SelectTrigger className="w-[120px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[130] text-xs">
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="exclude">Exclude</SelectItem>
                <SelectItem value="only">Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {requirementsMode !== 'none' && (
            <div className="flex flex-col gap-y-2">
              <Label className="text-xs text-secondary">
                {requirementsMode === 'exclude'
                  ? 'Hide these fields from onboarding:'
                  : 'Only collect these fields:'}
              </Label>
              <div className="max-h-[200px] overflow-y-auto rounded-md border p-2">
                {REQUIREMENT_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2 rounded px-1 py-1.5 text-sm hover:bg-black/5"
                  >
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={selectedRequirements.includes(option.value)}
                      onChange={() => handleRequirementToggle(option.value)}
                    />
                    <span className="text-primary">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingToolsPanel;
