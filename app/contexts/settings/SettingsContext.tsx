import {createContext} from 'react';

import type {Settings} from '@/types/settings';

export const defaultSettings: Settings = {
  locale: 'en-US',
};

export interface SettingsContextType {
  handleUpdate: (settings: Settings) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  ...defaultSettings,
  handleUpdate: () => {},
});
