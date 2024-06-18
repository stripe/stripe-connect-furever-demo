import type {FC, ReactNode} from 'react';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import type {Settings} from '@/types/settings';
import {defaultSettings, SettingsContext} from './SettingsContext';

const STORAGE_KEY = 'furever.app.settings';

const restoreSettings = (): Settings | null => {
  let value = null;

  if (window.location.pathname == '/') {
    console.log('on homepage');
    return value;
  }

  try {
    const restored: string | null = window.localStorage.getItem(STORAGE_KEY);

    if (restored) {
      value = JSON.parse(restored);
      if (value.theme) {
        console.log('restore' + value.theme);
        const root = document.querySelector(':root');
        root && root.classList.remove('light', 'dark');
        root && root.classList.add(value.theme);
      }
    }
  } catch (err) {
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return value;
};

const storeSettings = (value: Record<string, any>): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
};

interface SettingsProviderProps {
  children?: ReactNode;
}

export const SettingsProvider: FC<SettingsProviderProps> = (props) => {
  const {children} = props;
  const [state, setState] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const restored = restoreSettings();

    if (restored) {
      setState((prevState) => ({
        ...prevState,
        ...restored,
        isInitialized: true,
      }));
    }
  }, []);

  const handleUpdate = (settings: Settings): void => {
    setState((prevState) => {
      storeSettings({
        ...settings,
      });

      return {
        ...prevState,
        ...settings,
      };
    });
  };

  useEffect(() => {
    const handleChangeLocale = (e: KeyboardEvent) => {
      if (e.key === '8' && e.metaKey && e.shiftKey) {
        handleUpdate({locale: 'en-US'});
      } else if (e.key === '9' && e.metaKey && e.shiftKey) {
        handleUpdate({locale: 'fr-FR'});
      } else if (e.key === '0' && e.metaKey && e.shiftKey) {
        handleUpdate({locale: 'ko-KR'});
      }
    };

    // Keyboard shortcut to enable/disable border
    document.addEventListener('keydown', handleChangeLocale);
    () => document.removeEventListener('keydown', handleChangeLocale);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        ...state,
        handleUpdate,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
