import {createContext} from 'react';

import {OverlayOption} from '@stripe/connect-js';
import type {Settings} from '@/types/settings';

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
