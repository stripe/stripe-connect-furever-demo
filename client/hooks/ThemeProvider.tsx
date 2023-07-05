import React from 'react';
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useColorMode} from './ColorModeProvider';

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const {mode} = useColorMode();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {main: mode === 'light' ? '#228403' : '#1E7D01'},
          secondary: {main: mode === 'light' ? '#002c04' : '#BAC2CC'},
          background: {
            default: mode === 'light' ? '#ffffff' : '#1A1B25',
          },
          text: {
            primary: mode === 'light' ? '#414552' : '#BAC2CC',
            secondary: mode === 'light' ? '#87909f' : '#828A99',
          },
          border: {
            main: mode === 'light' ? '#d5dbe1' : '#878787',
          },
          neutral50: {
            main: mode === 'light' ? '#f6f8fa' : '#1F212B',
          },
          neutral100: {
            main: mode === 'light' ? '#EBEEF1' : '#262633',
          },
        },
        components: {
          MuiTypography: {
            styleOverrides: {
              root: {
                color: mode === 'light' ? '#414552' : '#BAC2CC',
              },
            },
          },
        },
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Ubuntu',
          ].join(','),
          h2: {
            fontWeight: 700,
          },
          h3: {
            fontWeight: 700,
          },
          h4: {
            fontWeight: 700,
          },
          h5: {
            fontWeight: 700,
          },
        },
      }),
    [mode]
  );

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};
