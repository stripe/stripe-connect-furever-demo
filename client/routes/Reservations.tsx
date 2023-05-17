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
    <Box
      className="container-start w-fill"
      sx={{gap: 4, marginBottom: 2}}
      id="calendar"
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
        }}
      >
        Upcoming appointments
      </Typography>
      <Box className="calendar-header">
        <Box className="calendar-date-selector">
          <Button onClick={handleAlertDemoSite}>
            <ChevronLeftIcon />
          </Button>
          <Typography>{formattedDate}</Typography>
          <Typography color="text.secondary">Today</Typography>
          <Button onClick={handleAlertDemoSite}>
            <ChevronRightIcon />
          </Button>
        </Box>

        <Box className="calendar-settings">
          <Box className="calendar-settings-view">
            <Box onClick={handleAlertDemoSite}>
              <Typography>Day</Typography>
            </Box>
            <Box onClick={handleAlertDemoSite}>
              <Typography>Week</Typography>
            </Box>
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

      <Box id="calendar">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell variant="head" className="firstcol"></TableCell>
              {datesArray.map((date, dateIndex) => (
                <TableCell
                  key={dateIndex}
                  className={dateIndex === currentDayOfWeekIndex ? 'today' : ''}
                  variant="head"
                >
                  {date}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              0, 8, 0, 9, 0, 10, 0, 11, 0, 12, 0, 13, 0, 14, 0, 15, 0, 16, 0,
              17, 0, 18, 0,
            ].map((time, timeIndex) => (
              <TableRow key={timeIndex}>
                {(reservations as any[]).map((day, index) => (
                  <TableCell
                    key={index}
                    className={`${index === 0 ? 'firstcol' : ''} ${
                      index > 0 && index - 1 < currentDayOfWeekIndex
                        ? 'past'
                        : ''
                    }`}
                  >
                    {time !== 0 && index === 0 ? `${time}:00` : ''}
                    {time in day && (
                      <Box
                        className="event"
                        sx={{
                          height: `${(day[time].end - time) * 200}%`,
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
                          color={'text.secondary'}
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
      </Box>
    </Box>
  );
};

export default Reservations;
