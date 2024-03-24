import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import {Container} from '../components/Container';
import {useColorMode} from '../hooks/ColorModeProvider';
import {useEmbeddedComponentBorder} from '../hooks/EmbeddedComponentBorderProvider';
import {useSession} from '../hooks/SessionProvider';

export const Settings = () => {
  const {stripeAccount} = useSession();
  const {enableBorder, handleEnableBorderChange} = useEmbeddedComponentBorder();
  const {mode, handleModeChange} = useColorMode();

  return (
    <Container
      sx={{
        gap: 2,
        marginBottom: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
        }}
      >
        Settings
      </Typography>
      <FormGroup>
        {stripeAccount && (
          <FormControlLabel
            control={
              <Switch
                checked={enableBorder}
                onChange={(event) =>
                  handleEnableBorderChange(event.target.checked)
                }
              />
            }
            label="Enable embedded component border"
          />
        )}

        <FormControlLabel
          control={
            <Switch
              checked={mode === 'dark'}
              onChange={(event) =>
                handleModeChange(event.target.checked ? 'dark' : 'light')
              }
            />
          }
          label="Dark mode"
        />
      </FormGroup>
    </Container>
  );
};
