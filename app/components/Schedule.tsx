import studios from '@/app/data/studios.json';
import Container from '@/app/components/Container';
import {ChevronLeft, ChevronRight, ChevronDown} from 'lucide-react';

const SCHEDULE_HEIGHT = 1296;
const MINUTES_IN_BUSINESS_DAY = 540;

const getCurrentDate = () => {
  const currentDate = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  } as Intl.DateTimeFormatOptions;
  return currentDate.toLocaleDateString('en-US', options);
};

const renderHourBlock = (hour: string) => {
  return (
    <div className="flex h-36 flex-row">
      <div className="w-20 text-sm text-subdued">{hour}</div>
      <div className="grid flex-1 grid-cols-1 divide-y border-t-2">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

const Schedule = () => {
  return (
    <Container>
      <div className="space-y-8">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl font-bold">Today&apos;s schedule</h1>
          <div className="flex flex-row space-x-2">
            <ChevronLeft color="#f26552" />
            <div className="font-bold text-secondary">{getCurrentDate()}</div>
            <ChevronRight color="#f26552" />
          </div>
        </div>
        <div className="ml-20 flex flex-row">
          {studios.map(({id: studioId, name}) => (
            <h2
              key={studioId}
              className="ml-10 flex flex-1 flex-row items-center space-x-1 text-lg font-bold"
            >
              <div>{name}</div>
              <ChevronDown color="#6c7688" />
            </h2>
          ))}
        </div>
        <div className="relative flex">
          <div className="z-10 flex-1">
            {renderHourBlock('9:00am')}
            {renderHourBlock('10:00am')}
            {renderHourBlock('11:00am')}
            {renderHourBlock('12:00pm')}
            {renderHourBlock('1:00pm')}
            {renderHourBlock('2:00pm')}
            {renderHourBlock('3:00pm')}
            {renderHourBlock('4:00pm')}
            {renderHourBlock('5:00pm')}
            {renderHourBlock('6:00pm')}
          </div>
          <div className="absolute left-20 top-0 z-20 -ml-20 flex w-full flex-row pl-20">
            {studios.map(({id: studioId, classes}) => {
              return (
                <div
                  key={studioId}
                  className="relative ml-5 mr-5 flex flex-1 flex-col"
                >
                  {classes.map(
                    ({
                      id: classId,
                      name,
                      startTime,
                      endTime,
                      startTimeMinutes,
                      endTimeMinutes,
                      teacher,
                      attendees,
                      capacity,
                    }) => {
                      return (
                        <div
                          key={classId}
                          className="absolute ml-2 mr-2 flex w-full min-w-64 flex-col justify-between space-y-4 rounded-md bg-primary-foreground p-4 shadow-md"
                          style={{
                            height: `${Math.round(
                              (SCHEDULE_HEIGHT *
                                (endTimeMinutes - startTimeMinutes)) /
                                MINUTES_IN_BUSINESS_DAY
                            )}px`,
                            top: `${Math.round(
                              (SCHEDULE_HEIGHT * startTimeMinutes) /
                                MINUTES_IN_BUSINESS_DAY
                            )}px`,
                          }}
                        >
                          <div>
                            <div className="text-md font-medium text-secondary">
                              {startTime} - {endTime}
                            </div>
                            <div className="text-md font-bold">{name}</div>
                          </div>
                          <div className="flex flex-row justify-between">
                            <div className="text-md">{teacher}</div>
                            <div className="text-sm text-subdued">
                              {attendees}/{capacity} attendees
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Schedule;
