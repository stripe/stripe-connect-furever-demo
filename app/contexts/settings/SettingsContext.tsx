import {createContext} from 'react';

import type {Settings} from '@/types/settings';
import type {OverlayOption} from '@/app/components/Tools/OverlaySelector';

export const defaultSettings: Settings = {
  locale: 'en-US',
  theme: 'light',
  overlay: 'dialog',
};

export interface SettingsContextType {
  locale?: string;
  theme?: string;
  overlay?: OverlayOption;
  handleUpdate: (settings: Settings) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  ...defaultSettings,
  handleUpdate: (settings: Settings) => {},
});
