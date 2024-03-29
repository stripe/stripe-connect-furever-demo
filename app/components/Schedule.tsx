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
    <div className="flex flex-row h-36">
      <div className="text-subdued text-sm w-20">{hour}</div>
      <div className="grid grid-cols-1 divide-y flex-1 border-t-2">
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
            <div className="text-secondary font-bold">{getCurrentDate()}</div>
            <ChevronRight color="#f26552" />
          </div>
        </div>
        <div className="flex flex-row ml-20">
          {studios.map(({id: studioId, name}) => (
            <h2
              key={studioId}
              className="text-lg font-bold flex-1 ml-10 flex flex-row items-center space-x-1"
            >
              <div>{name}</div>
              <ChevronDown color="#6c7688" />
            </h2>
          ))}
        </div>
        <div className="flex relative">
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
          <div className="flex flex-row absolute z-20 top-0 w-full left-20 pl-20 -ml-20">
            {studios.map(({id: studioId, classes}) => {
              return (
                <div
                  key={studioId}
                  className="flex flex-col relative flex-1 ml-5 mr-5"
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
                          className="bg-primary-foreground space-y-2 rounded-md p-3 ml-2 mr-2 absolute min-w-64 flex flex-col justify-between w-full shadow hover:shadow-md hover:bg-[#FFF5E5] cursor-pointer transition duration-150"
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
                          <div className="flex flex-row justify-between items-center">
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
