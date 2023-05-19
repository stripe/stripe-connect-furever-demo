import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import reservations from '../assets/data/reservations.json';
import {Container} from '../components/Container';

const styles = {
  table: {
    width: '100%',
    height: '100%',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
  },
  tableHead: {
    borderBottom: '2px solid',
    borderBottomColor: '#e8e8e8',
  },
  tableHeadCell: {
    textAlign: 'center',
    width: '100%',
    fontWeight: 'bold',
    padding: '1rem',
  },
  tableCell: {
    borderRight: '1px solid',
    borderRightColor: '#e8e8e8',
    whiteSpace: 'none',
    wordWrap: 'nowrap',
    textAlign: 'center',
    position: 'relative',
    verticalAlign: 'top',
    height: 60,
    padding: '0.25rem 0.25rem 0 0.25rem',
    width: 'auto',
  },
  firstCol: {
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.5)',
    padding: '0.25rem 0',
    textAlign: 'center',
    border: 0,
    position: 'relative',
    top: -30,
    borderBottom: '1px solid transparent',
    width: {
      xs: 50,
      md: 60,
    },
    fontSize: {
      xs: 12,
      md: 14,
    },
  },
  calendarEvent: {
    background: '#f3f4f6',
    color: 'black',
    borderRadius: 1,
    padding: '0.5rem',
    overflowX: 'hidden',
    transition: 'all 0.2s',
    borderLeft: '2px solid',
    borderColor: 'primary.main',
    zIndex: 2,
    position: 'relative',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    ':hover': {
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
    },
  },
  calendarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1em',
    width: '100%',
    flexWrap: 'wrap',
    gap: 2.5,
  },
  calendarButtonsContainer: {
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    gap: 2.5,
    height: 36,
  },
  calendarButtons: {
    borderRadius: 1,
    border: '1px solid',
    borderColor: '#e8e8e8',
  },
  calendarDateSelector: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    borderRadius: 1,
    border: '1px solid',
    borderColor: '#e8e8e8',
  },
  calendarDateSelectorButton: {
    textTransform: 'none',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0px 20px 0px 20px',
    borderRadius: 1,
  },
};

const Reservations = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
  const datesArray = [];
  const currentDayOfWeekIndex = (currentDate.getDay() - 1 + 7) % 7;
  // Get the first day of the week (Monday) for the given date
  const firstDayOfWeek = currentDate;
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() - currentDayOfWeekIndex);
  // Add the dates for the current week to the result array
  for (let i = 0; i < 7; i++) {
    datesArray.push(
      `${
        daysOfWeek[(firstDayOfWeek.getDay() - 1 + 7) % 7]
      } ${firstDayOfWeek.getDate()}`
    );
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1);
  }
  function handleAlertDemoSite(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    alert(
      'Woof woof, this is a demo site! This functionality in this website is minimal as this is only a demo, but you can use the payments and payouts tabs, as well as the account page to test Connect Embedded components.'
    );
  }

  return (
    <Container
      sx={{
        gap: 4,
        marginBottom: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
        }}
      >
        Upcoming appointments
      </Typography>
      <Box sx={styles.calendarHeader}>
        <Box sx={styles.calendarButtonsContainer}>
          <Button
            onClick={handleAlertDemoSite}
            sx={{
              ...styles.calendarDateSelectorButton,
              ...styles.calendarButtons,
            }}
          >
            <ChevronLeftIcon />
          </Button>
          <Typography>{formattedDate}</Typography>
          <Typography color="text.secondary">Today</Typography>
          <Button
            onClick={handleAlertDemoSite}
            sx={{
              ...styles.calendarDateSelectorButton,
              ...styles.calendarButtons,
            }}
          >
            <ChevronRightIcon />
          </Button>
        </Box>

        <Box sx={styles.calendarButtonsContainer}>
          <Box sx={styles.calendarDateSelector}>
            <Button
              onClick={handleAlertDemoSite}
              sx={styles.calendarDateSelectorButton}
            >
              <Typography>Day</Typography>
            </Button>
            <Button
              onClick={handleAlertDemoSite}
              sx={{
                ...styles.calendarDateSelectorButton,
                backgroundColor: '#f3f4f6',
              }}
            >
              <Typography>Week</Typography>
            </Button>
          </Box>
          <Button
            variant="contained"
            sx={{gap: 1, textTransform: 'none'}}
            onClick={handleAlertDemoSite}
          >
            <AddIcon />
            <Typography color="white" fontWeight={600}>
              New appointment
            </Typography>
          </Button>
        </Box>
      </Box>

      <Table sx={styles.table}>
        <TableHead sx={styles.tableHead}>
          <TableRow>
            <TableCell
              variant="head"
              sx={{...styles.tableHeadCell, ...styles.firstCol}}
            ></TableCell>
            {datesArray.map((date, dateIndex) => (
              <TableCell
                key={dateIndex}
                sx={{
                  ...styles.tableHeadCell,
                  ...(dateIndex === currentDayOfWeekIndex
                    ? {color: 'primary.main'}
                    : {}),
                  fontSize: {
                    xs: 12,
                    sm: 15,
                  },
                  fontWeight: 600,
                }}
                variant="head"
              >
                {date}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{position: 'relative'}}>
          {[
            0, 8, 0, 9, 0, 10, 0, 11, 0, 12, 0, 13, 0, 14, 0, 15, 0, 16, 0, 17,
            0, 18, 0,
          ].map((time, timeIndex) => (
            <TableRow key={timeIndex}>
              {(reservations as any[]).map((day, index) => (
                <TableCell
                  key={index}
                  sx={{
                    ...(index === 0 ? styles.firstCol : styles.tableCell),
                    ...(index > 0 && index - 1 < currentDayOfWeekIndex
                      ? {
                          backgroundColor: '#fafafa',
                        }
                      : {}),
                  }}
                >
                  {time !== 0 && index === 0 ? `${time}:00` : ''}
                  {time in day && (
                    <Box
                      sx={{
                        height: `${(day[time].end - time) * 200}%`,
                        ...styles.calendarEvent,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: {
                            xs: 12,
                            md: 14,
                          },
                        }}
                      >
                        {day[time].title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: {
                            xs: 12,
                            md: 14,
                          },
                        }}
                      >
                        {day[time].subtitle}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{
                          fontSize: {
                            xs: 12,
                            md: 14,
                          },
                        }}
                      >
                        {day[time].description}
                      </Typography>
                    </Box>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Reservations;
