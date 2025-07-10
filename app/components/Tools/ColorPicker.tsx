import {useContext, useCallback, useState} from 'react';
import {SettingsContext} from '@/app/contexts/settings';
import {Input} from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { defaultPrimaryColor } from '@/app/contexts/themes/ThemeConstants';

const ColorPicker = () => {
  const {data: session, update} = useSession();
  const [customColor, setCustomColor] = useState(
     session?.user?.primaryColor ||
    defaultPrimaryColor
  );

  const updatePrimaryColor = useCallback((color: string) => {
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
        placeholder={defaultPrimaryColor}
      />
    </>
  );
};

export default ColorPicker;
