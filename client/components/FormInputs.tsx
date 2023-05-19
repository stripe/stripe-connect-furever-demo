import * as React from 'react';
import Box, {BoxProps} from '@mui/material/Box';
import Input, {InputProps} from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import NativeSelect, {NativeSelectProps} from '@mui/material/NativeSelect';

const renderLabel = ({
  label,
  size,
}: {
  label: string;
  size: 'small' | 'medium' | undefined;
}) => (
  <InputAdornment position="start">
    <Typography
      sx={{
        fontSize: size === 'small' ? 14 : 15,
        width: '120px',
        paddingRight: 1.5,
        paddingY: size === 'small' ? 0.5 : 1,
        fontWeight: 500,
        textAlign: 'right',
      }}
      color="text.secondary"
    >
      {label}
    </Typography>
  </InputAdornment>
);

const getInputStyles = (size: 'small' | 'medium' | undefined) => ({
  fontSize: size === 'small' ? 14 : 15,
  paddingTop: size === 'small' ? 0.5 : 1,
  paddingBottom: size === 'small' ? 0.5 : 1,
});

type TextInputProps = InputProps & {
  label?: string;
};

export const TextInput = ({label, size, ...rest}: TextInputProps) => {
  return (
    <Input
      sx={{
        '& .MuiInputBase-input': getInputStyles(size),
      }}
      startAdornment={label && renderLabel({label, size})}
      disableUnderline
      fullWidth
      {...rest}
    />
  );
};

type SelectInputProps = NativeSelectProps & {
  label?: string;
};

export const SelectInput = ({
  label,
  children,
  size,
  ...rest
}: SelectInputProps) => (
  <NativeSelect
    disableUnderline
    sx={{
      '& .MuiNativeSelect-select': {...getInputStyles(size), height: 'auto'},
    }}
    startAdornment={label && renderLabel({label, size})}
    fullWidth
    type="select"
    {...rest}
  >
    {children}
  </NativeSelect>
);

export const FormBlock = (props: BoxProps) => (
  <Box
    boxShadow={1}
    width="100%"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 0.5,
      paddingY: 0.5,
    }}
    {...props}
  />
);
