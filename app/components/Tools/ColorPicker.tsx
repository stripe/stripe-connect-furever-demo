import {useContext, useCallback, useState} from 'react';
import {SettingsContext} from '@/app/contexts/settings';
import {Input} from '@/components/ui/input';

const ColorPicker = () => {
  const settings = useContext(SettingsContext);
  const [customColor, setCustomColor] = useState(
    settings.primaryColor || '#27AE60'
  );
  const updatePrimaryColor = useCallback((color: string) => {
    settings.handleUpdate({primaryColor: color}); 
    fetch('/api/primary_color', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({primaryColor: color}),
    });
  }, [settings]);

  const handleCustomColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = e.target.value;
      setCustomColor(newColor);
      updatePrimaryColor(newColor);
    },
    [updatePrimaryColor]
  );

  return (
    <>
      <Input
        type="color"
        value={customColor}
        onChange={handleCustomColorChange}
        className="h-8 w-12 border-none p-0"
        title="Custom color picker"
      />
      <Input
        type="text"
        value={customColor}
        onChange={(e) => {
          setCustomColor(e.target.value);
          if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
            updatePrimaryColor(e.target.value);
          }
        }}
        className="h-8 flex-1 text-sm"
        placeholder="#27AE60"
      />
    </>
  );
};

export default ColorPicker;
