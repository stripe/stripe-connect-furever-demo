import React from 'react';
import Box from '@mui/material/Box';
import {SxProps, Theme} from '@mui/system';
import useTheme from '@mui/system/useTheme';

export const Footer = ({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}) => {
  const theme = useTheme();

  const [height, setHeight] = React.useState(0);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!ref.current) return; // wait for the ref to be available
    const resizeObserver = new ResizeObserver((entries) => {
      const {height} = entries[0].contentRect;
      setHeight(height + 25);
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  return (
    <>
      <Box
        sx={{
          height,
        }}
      />
      <Box
        component="div"
        ref={ref}
        sx={{
          position: 'fixed',
          bottom: {
            lg: theme.spacing(3),
            xs: 0,
          },
          left: 0,
          right: 0,
          zIndex: 2147483646, // Smaller than the embedded overlay
          ...sx,
        }}
      >
        {children}
      </Box>
    </>
  );
};
