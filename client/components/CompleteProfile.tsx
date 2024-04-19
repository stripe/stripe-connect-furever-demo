import React from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useMutation} from 'react-query';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography, {TypographyProps} from '@mui/material/Typography';
import {useTheme} from '@mui/system';
import StripeLogo from '../assets/images/stripe-grey.svg';
import {TextInput, SelectInput, FormBlock} from '../components/FormInputs';
import {CompleteProfileFooter} from './NoticeFooter';
import {Container} from './Container';

type FormValues = {
  firstName: string;
  lastName: string;
  country: string;
  type: string;
  prefill: boolean;
  salonName: string;
  salonLicense: string;
  salonSpecialty: string;
  accountConfiguration: string;
};

const FormControl = ({children}: {children: React.ReactNode}) => (
  <Box width="100%" gap={2} display="flex" flexDirection="column">
    {children}
  </Box>
);

const StyledTypography = styled(Typography)(() => ({
  textTransform: 'uppercase',
  fontWeight: 500,
}));

const FormBlockHeader = (props: TypographyProps) => (
  <StyledTypography color="text.secondary" {...props} />
);

const useCreateStripeAccount = () => {
  const navigate = useNavigate();
  return useMutation<void, Error, FormValues>(
    'createAccount',
    async (formValues: FormValues) => {
      const {salonName, salonLicense, salonSpecialty, ...rest} = formValues;
      const response = await fetch('/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          salon: {
            name: salonName,
            license: salonLicense,
            specialty: salonSpecialty,
          },
          ...rest,
        }),
      });
      if (response.ok) {
        return navigate(0);
      }
      const {error} = await response.json();
      throw new Error(error);
    }
  );
};

export const CompleteProfile = () => {
  const theme = useTheme();
  const [formValues, setFormValues] = React.useState<FormValues>({
    firstName: '',
    lastName: '',
    country: 'US',
    type: 'individual',
    prefill: false,
    salonName: '',
    salonLicense: 'LINC123',
    salonSpecialty: 'dogs',
    accountConfiguration: 'no_dashboard_soll',
  });
  const [searchParams] = useSearchParams();
  const {mutate, isLoading, error} = useCreateStripeAccount();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(formValues);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 4,
        }}
        component="form"
        width="100%"
        onSubmit={handleSubmit}
      >
        <FormControl>
          <FormBlockHeader>Business type</FormBlockHeader>
          <RadioGroup
            aria-labelledby="business-type"
            name="salon-type"
            sx={{gap: 1.5}}
            value={formValues.type}
            onChange={(event) =>
              setFormValues((prev) => ({
                ...prev,
                type: event.target.value,
              }))
            }
          >
            <FormControlLabel
              value="individual"
              control={<Radio sx={{paddingY: 0}} />}
              label={<Typography fontSize={15}>Independent salon</Typography>}
            />
            <FormControlLabel
              value="company"
              control={<Radio sx={{paddingY: 0}} />}
              label={<Typography fontSize={15}>Chain of salons</Typography>}
            />
            <FormControlLabel
              value="other"
              control={<Radio sx={{paddingY: 0}} />}
              label={<Typography fontSize={15}>Other</Typography>}
            />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormBlockHeader>Personal information</FormBlockHeader>
          <FormBlock>
            <TextInput
              label="First name"
              name="firstName"
              placeholder="Jenny"
              required
              value={formValues.firstName}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  firstName: event.target.value,
                }))
              }
            />
            <Divider />
            <TextInput
              label="Last name"
              name="lastName"
              placeholder="Rosen"
              required
              value={formValues.lastName}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  lastName: event.target.value,
                }))
              }
            />
            <Divider />
            <SelectInput
              label="Country"
              type="select"
              name="country"
              required
              value={formValues.country}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  country: event.target.value,
                }))
              }
            >
              <option value="AU">Australia</option>
              <option value="AT">Austria</option>
              <option value="BE">Belgium</option>
              <option value="BR">Brazil</option>
              <option value="BG">Bulgaria</option>
              <option value="CA">Canada</option>
              <option value="HR">Croatia</option>
              <option value="CY">Cyprus</option>
              <option value="CZ">Czech Republic</option>
              <option value="DK">Denmark</option>
              <option value="EE">Estonia</option>
              <option value="FI">Finland</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
              <option value="GI">Gibraltar</option>
              <option value="GR">Greece</option>
              <option value="HK">Hong Kong SAR China</option>
              <option value="HU">Hungary</option>
              <option value="IN">India</option>
              <option value="ID">Indonesia</option>
              <option value="IE">Ireland</option>
              <option value="IT">Italy</option>
              <option value="JP">Japan</option>
              <option value="LV">Latvia</option>
              <option value="LI">Liechtenstein</option>
              <option value="LT">Lithuania</option>
              <option value="LU">Luxembourg</option>
              <option value="MY">Malaysia</option>
              <option value="MT">Malta</option>
              <option value="MX">Mexico</option>
              <option value="NL">Netherlands</option>
              <option value="NZ">New Zealand</option>
              <option value="NO">Norway</option>
              <option value="PL">Poland</option>
              <option value="PT">Portugal</option>
              <option value="RO">Romania</option>
              <option value="SG">Singapore</option>
              <option value="SK">Slovakia</option>
              <option value="SI">Slovenia</option>
              <option value="ES">Spain</option>
              <option value="SE">Sweden</option>
              <option value="CH">Switzerland</option>
              <option value="TH">Thailand</option>
              <option value="GB">United Kingdom</option>
              <option value="AE">United Arab Emirates</option>
              <option value="US">United States</option>
            </SelectInput>
          </FormBlock>
        </FormControl>

        <FormControl>
          <FormBlockHeader>Salon information</FormBlockHeader>
          <FormBlock>
            <TextInput
              label="Business"
              name="salon[name]"
              placeholder="Pawsitively Purrfect Grooming"
              required
              value={formValues.salonName}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  salonName: event.target.value,
                }))
              }
            />
            <Divider />
            <TextInput
              label="License"
              name="salon[license]"
              placeholder="LINC123"
              required
              value={formValues.salonLicense}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  salonLicense: event.target.value,
                }))
              }
            />
            <Divider />
            <SelectInput
              label="Specialty"
              type="select"
              name="salon[specialty]"
              required
              value={formValues.salonSpecialty}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  salonSpecialty: event.target.value,
                }))
              }
            >
              <option value="dogs">Dogs</option>
              <option value="cats">Cats</option>
              <option value="hamsters">Hamsters</option>
            </SelectInput>
          </FormBlock>
        </FormControl>

        <FormControl>
          <FormBlockHeader>Payment information</FormBlockHeader>
          <Box
            sx={{
              border: '2px solid',
              borderColor: theme.palette.border.main,
              borderRadius: 1.5,
              padding: 2.5,
              display: 'flex',
              justifyContent: 'space-between',
            }}
            gap={2}
          >
            <Typography fontSize={14}>
              We use Stripe to make sure you get paid on time and to keep your
              personal bank and details secure. Click <b>create account</b> to
              set up your payments on Stripe.
            </Typography>
            <Box
              component="img"
              src={StripeLogo}
              alt="Stripe logo"
              title="Stripe logo"
              sx={{
                display: {
                  xs: 'none',
                  sm: 'block',
                },
              }}
            />
          </Box>
        </FormControl>

        <FormControl>
          <FormBlockHeader>Prefill account onboarding</FormBlockHeader>
          <FormControlLabel
            sx={{display: 'flex', alignItems: 'flex-start'}}
            control={
              <Checkbox
                sx={{paddingY: 0}}
                name="prefill"
                checked={formValues.prefill}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    prefill: event.target.checked,
                  }))
                }
              />
            }
            label={
              <Typography fontSize={14}>
                Check this if you want to simulate prefilling information into
                the account before Connect onboarding. Prefilled information
                will not be collected again in the Connect Onboarding flow.
              </Typography>
            }
          />
        </FormControl>

        <FormControl>
          <FormBlockHeader>Account configuration</FormBlockHeader>
          <FormBlock>
            <SelectInput
              type="select"
              name="accountConfiguration"
              value={formValues.accountConfiguration}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  accountConfiguration: event.target.value,
                }))
              }
            >
              <option value="no_dashboard_soll">
                Connected account without Stripe dashboard access + Stripe is
                liable for paying back negative balances + Stripe collects fees
                directly from connected accounts
              </option>
              <option value="no_dashboard_poll">
                Connected account without Stripe dashboard access + FurEver is
                liable for paying back negative balances + Stripe collects fees
                from FurEver
              </option>
              <option value="dashboard_soll">
                Connected account with Stripe Dashboard access + Stripe is
                liable for paying back negative balances + Stripe collects fees
                directly from Connected accounts
              </option>
            </SelectInput>
          </FormBlock>
        </FormControl>

        <Container
          sx={{
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              fontWeight: 700,
            }}
          >
            {isLoading ? 'Creating' : 'Complete profile'}
          </Button>
          {error?.message && (
            <Typography variant="body2" color="error">
              {error.message}
            </Typography>
          )}
        </Container>
      </Box>
      <CompleteProfileFooter />
    </>
  );
};
