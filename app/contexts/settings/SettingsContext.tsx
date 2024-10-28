import {createContext} from 'react';

import type {Settings} from '@/types/settings';

export const defaultSettings: Settings = {
  locale: 'en-US',
  theme: 'light',
};

export interface SettingsContextType {
  locale?: string;
  theme?: string;
  handleUpdate: (settings: Settings) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  ...defaultSettings,
  handleUpdate: (settings: Settings) => {},
});
