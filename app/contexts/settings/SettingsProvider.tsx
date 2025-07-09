import type {FC, ReactNode} from 'react';
import {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import PropTypes from 'prop-types';

import type {Settings} from '@/types/settings';
import {defaultSettings, SettingsContext} from './SettingsContext';

const STORAGE_KEY = 'furever.app.settings';

const updateCSSVariables = (primaryColor: string) => {
  const root = document.documentElement;

  // Update the main accent color
  root.style.setProperty('--accent', primaryColor);

  // Generate subdued color (lighter version for light theme)
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgb = hexToRgb(primaryColor);
  if (rgb) {
    // For light theme - create a very light version
    const lightSubdued = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`;
    root.style.setProperty('--accent-subdued', lightSubdued);

    // For dark theme - create a darker version with transparency
    const darkSubdued = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;

    // Update CSS variables for both themes
    const theme = document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';

    if (theme === 'light') {
      root.style.setProperty('--accent-foreground', '#f4f4f5');
      root.style.setProperty('--accent-subdued', lightSubdued);
    } else {
      root.style.setProperty('--accent-foreground', '#14171d');
      root.style.setProperty('--accent-subdued', darkSubdued);
    }
  }
};

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
      if (value.primaryColor) {
        updateCSSVariables(value.primaryColor);
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

const fetchPrimaryColorFromDB = async (): Promise<string | null> => {
  try {
    const response = await fetch('/api/primary_color');
    if (response.ok) {
      const data = await response.json();
      return data.primaryColor;
    }
  } catch (error) {
    console.error('Error fetching primary color from database:', error);
  }
  return null;
};

interface SettingsProviderProps {
  children?: ReactNode;
}

export const SettingsProvider: FC<SettingsProviderProps> = (props) => {
  const {children} = props;
  const [state, setState] = useState<Settings>(defaultSettings);
  const {data: session, status} = useSession();

  useEffect(() => {
    const initializeSettings = async () => {
      // First restore from localStorage
      const restored = restoreSettings();

      let initialState = defaultSettings;

      if (restored) {
        initialState = {
          ...defaultSettings,
          ...restored,
          isInitialized: true,
        };
      }

      setState(initialState);
    };

    initializeSettings();
  }, []);

  // Separate effect to handle session changes and fetch primary color from DB
  useEffect(() => {
    const fetchAndUpdatePrimaryColor = async () => {
      if (status === 'authenticated' && session) {
        try {
          const dbPrimaryColor = await fetchPrimaryColorFromDB();
          
          if (dbPrimaryColor) {
            setState(prevState => ({
              ...prevState,
              primaryColor: dbPrimaryColor,
            }));
            updateCSSVariables(dbPrimaryColor);
          }
        } catch (error) {
          console.error('Error fetching primary color after login:', error);
        }
      }
    };

    fetchAndUpdatePrimaryColor();
  }, [session, status]);

  const handleUpdate = (settings: Settings): void => {
    setState((prevState) => {
      storeSettings({
        ...settings,
      });

      // Update CSS variables if primaryColor changed
      if (settings.primaryColor) {
        updateCSSVariables(settings.primaryColor);
      }

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
