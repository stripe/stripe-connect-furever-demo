import {useContext, useCallback, useState, useEffect} from 'react';
import {SettingsContext} from '@/app/contexts/settings';
import {Input} from '@/components/ui/input';
import { defaultPrimaryColor } from '@/app/contexts/themes/ThemeConstants';
import { Button } from '@/components/ui/button';

const ColorPicker = () => {
  const settings = useContext(SettingsContext);
  const [customColor, setCustomColor] = useState(
    settings.primaryColor ||
    defaultPrimaryColor
  );
  const [isDirty, setIsDirty] = useState(false);

  const updatePrimaryColor = useCallback(async () => {
    fetch('/api/primary_color', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({primaryColor: customColor}),
    });
    settings.handleUpdate({primaryColor: customColor});
    setIsDirty(false);
  }, [customColor, settings]);

  const handleColorChange = (color: string) => {
    setCustomColor(color);
    setIsDirty(true);
  };

  return (
    <div className="flex gap-2 items-center">
      <Input
        type="color"
        value={customColor}
        onChange={(e) => handleColorChange(e.target.value)}
        className="h-8 w-12 border-none p-0"
        title="Custom color picker"
      />
      <Input
        type="text"
        value={customColor}
        onChange={(e) => {
          if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
            handleColorChange(e.target.value);
          }
        }}
        className="h-8 flex-1 text-sm"
        placeholder={defaultPrimaryColor}
      />
      {isDirty && (
        <Button 
          onClick={updatePrimaryColor}
          size="sm"
          className="whitespace-nowrap"
        >
          Apply
        </Button>
      )}
    </div>
  );
};

export default ColorPicker;
