import studios from '../data/studios.json';
import Container from './Container';

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
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-bold">Today&apos;s schedule</h1>
        <div className="text-primary font-bold">{getCurrentDate()}</div>
      </div>
      <div className="flex flex-row ml-20">
        {studios.map(({id: studioId, name}) => (
          <h2 key={studioId} className="text-lg font-bold flex-1 ml-10">
            {name}
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
                        className="bg-secondary space-y-4 rounded-md p-4 ml-2 mr-2 absolute min-w-64 flex flex-col justify-between w-full"
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
                          <div className="text-md font-medium text-primary">
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
    </Container>
  );
};

export default Schedule;
