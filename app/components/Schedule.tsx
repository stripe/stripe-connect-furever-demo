import studios from '@/app/data/studios.json';
import Container from '@/app/components/Container';
import Image from 'next/image';
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

function getMinutesSince9AM() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const targetHour = 9; // 9 AM
  const targetMinute = 0; // 0 minutes

  let minutesSince9AM = 0;

  if (currentHour > targetHour) {
    // Calculate minutes after 9 AM
    minutesSince9AM = (currentHour - targetHour) * 60 + currentMinute;
  } else if (currentHour === targetHour) {
    // It's 9 AM or later, but before 10 AM
    minutesSince9AM = currentMinute;
  } else {
    // It's before 9 AM, so calculate minutes until tomorrow's 9 AM
    minutesSince9AM = (24 - targetHour + currentHour) * 60 - currentMinute;
  }

  return minutesSince9AM;
}

const renderDayProgressBar = () => {
  const minutesSince9AM = getMinutesSince9AM();

  if (minutesSince9AM < 0 || minutesSince9AM > MINUTES_IN_BUSINESS_DAY) {
    return null;
  }

  return (
    <div
      className="absolute left-20 h-[2px] w-[calc(100%-10rem)] bg-secondary pl-20"
      style={{
        top: `${(SCHEDULE_HEIGHT * minutesSince9AM) / MINUTES_IN_BUSINESS_DAY}px`,
      }}
    >
      <div className="relative left-[-80px] top-[-3px] h-2 w-2 rounded-full border-2 border-secondary bg-secondary"></div>
    </div>
  );
};

const renderHourBlock = (hour: string) => {
  return (
    <div className="flex h-36 flex-row">
      <div className="w-20 text-sm text-subdued">
        <div className="-translate-y-[50%]">{hour}</div>
      </div>
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
      <div className="space-y-4">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl font-bold">Today&apos;s schedule</h1>
          <div className="flex flex-row space-x-2">
            <ChevronLeft color="#f26552" />
            <div className="font-bold text-secondary">{getCurrentDate()}</div>
            <ChevronRight color="#f26552" />
          </div>
        </div>
        <div className="relative left-20 z-20 -ml-20 flex flex-row pl-20">
          {renderDayProgressBar()}
        </div>
        <div className="ml-20 flex flex-row">
          {studios.map(({id: studioId, name}) => (
            <h2
              key={studioId}
              className="ml-8 flex flex-1 flex-row items-center space-x-1 text-lg font-bold"
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
                  className="relative first:ml-5 mr-5 flex flex-1 flex-col"
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
                      profilePhoto,
                    }) => {
                      return (
                        <div
                          key={classId}
                          className="absolute ml-2 mr-2 flex w-full min-w-64 cursor-pointer flex-col justify-between space-y-2 rounded-md bg-primary-foreground p-3 shadow transition duration-150 hover:bg-[#FFF5E5] hover:shadow-md"
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
                          <div className="flex flex-row items-center justify-between">
                            <div className="text-md flex gap-2 items-center">
                              <Image
                                className="w-5 h-5 relative rounded-full"
                                fill
                                quality={100}
                                src={`/headshots/${profilePhoto}.jpg`}
                                alt={`Profile photo of ${name}`}
                              />
                              {teacher}
                            </div>
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
