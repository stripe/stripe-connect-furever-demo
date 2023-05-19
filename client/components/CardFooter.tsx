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
};

export const CardFooter = ({title, children}: Props) => {
  const theme = useTheme();

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
      <Box boxShadow={6}>
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
      </Box>
    </Footer>
  );
};
