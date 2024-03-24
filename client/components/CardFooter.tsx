import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/system/useTheme';
import {Footer} from './Footer';

type Props = {
  title: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
};

export const CardFooter = ({title, children, disabled}: Props) => {
  const theme = useTheme();

  const renderBody = () => {
    if (disabled) {
      return (
        <Box
          sx={{
            minHeight: 48,
            paddingY: theme.spacing(1.5),
            paddingX: theme.spacing(2),
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Typography sx={{fontWeight: 600}}>{title}</Typography>
        </Box>
      );
    }
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandLessIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{fontWeight: 600}}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Footer
      sx={{
        bottom: {
          xs: theme.spacing(0),
          sm: theme.spacing(3),
        },
        left: {
          xs: theme.spacing(0),
          sm: theme.spacing(4),
        },
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        maxWidth: {xs: '100%', sm: '500px'},
      }}
    >
      <Box boxShadow={6}>{renderBody()}</Box>
    </Footer>
  );
};
