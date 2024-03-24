import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import {useSession} from '../hooks/SessionProvider';

const ENABLE_EMBEDDED_ACCOUNT_MANAGEMENT = 'enable_embedded_account_management';
const ENABLE_EMBEDDED_ONBOARDING = 'enable_embedded_onboarding';

export const EnableEmbeddedCheckbox = ({label}: {label: string}) => {
  const {user} = useSession();
  if (user?.country === 'US') {
    return null;
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const isEmbeddedAccountManagementEnabled =
    urlParams.get(ENABLE_EMBEDDED_ACCOUNT_MANAGEMENT) === 'true';
  const isEmbeddedOnboardingEnabled =
    urlParams.get(ENABLE_EMBEDDED_ONBOARDING) === 'true';
  const isEmbeddedEnabled =
    isEmbeddedAccountManagementEnabled && isEmbeddedOnboardingEnabled;

  return (
    <FormControlLabel
      sx={{display: 'flex', alignItems: 'center'}}
      control={
        <Checkbox
          sx={{paddingY: 0}}
          name="enable-embedded"
          defaultChecked={isEmbeddedEnabled}
          onChange={() => {
            const currentUrl = new URL(window.location.href);
            if (isEmbeddedEnabled) {
              currentUrl.searchParams.set(
                ENABLE_EMBEDDED_ACCOUNT_MANAGEMENT,
                'false'
              );
              currentUrl.searchParams.set(ENABLE_EMBEDDED_ONBOARDING, 'false');
            } else {
              currentUrl.searchParams.set(
                ENABLE_EMBEDDED_ACCOUNT_MANAGEMENT,
                'true'
              );
              currentUrl.searchParams.set(ENABLE_EMBEDDED_ONBOARDING, 'true');
            }
            window.location.href = currentUrl.toString();
          }}
        />
      }
      label={<Typography fontSize={14}>{label}</Typography>}
    />
  );
};
