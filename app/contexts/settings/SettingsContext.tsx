import {createContext} from 'react';

import type {Settings} from '@/types/settings';

type LocaleType = 'en-US' | 'fr-FR' | 'ko-KR';

export const defaultSettings: Settings = {
  locale: 'en-US',
};

export interface SettingsContextType {
  locale: string;
  handleUpdate: (settings: Settings) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  ...defaultSettings,
  handleUpdate: (settings: Settings) => {},
});
