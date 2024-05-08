import schedule from '@/app/data/schedule.json';
import Container from '@/app/components/Container';
import Image from 'next/image';
import {Badge} from '@/components/ui/badge';
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
      className="absolute left-20 h-[2px] w-[calc(100%-10rem)] bg-accent pl-20"
      style={{
        top: `${(SCHEDULE_HEIGHT * minutesSince9AM) / MINUTES_IN_BUSINESS_DAY}px`,
      }}
    >
      <div className="relative left-[-80px] top-[-3px] h-2 w-2 rounded-full border-2 border-accent bg-accent"></div>
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
    <Container className="px-5 py-5">
      <div className="space-y-4">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl font-bold">Today&apos;s schedule</h1>
          <div className="flex flex-row space-x-2">
            <ChevronLeft color="var(--accent)" />
            <div className="font-bold text-accent">{getCurrentDate()}</div>
            <ChevronRight color="var(--accent)" />
          </div>
        </div>
        <div className="relative left-20 z-20 -ml-20 flex flex-row pl-20">
          {renderDayProgressBar()}
        </div>
        <div className="ml-20 flex flex-row">
          {schedule.map(({id: id, groomer}) => (
            <h2
              key={id}
              className="ml-8 flex flex-1 flex-row items-center space-x-1 text-lg font-bold"
            >
              <div>{groomer}</div>
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
            {schedule.map(({id: id, sessions}) => {
              return (
                <div
                  key={id}
                  className="relative mr-5 flex flex-1 flex-col first:ml-5"
                >
                  {sessions.map(
                    ({
                      id: classId,
                      name,
                      startTime,
                      endTime,
                      startTimeMinutes,
                      endTimeMinutes,
                      pet,
                      petType,
                      profilePhoto,
                    }) => {
                      const badge =
                        petType == 'dog' ? (
                          <Badge variant="blue">Dog</Badge>
                        ) : (
                          <Badge variant="red">Cat</Badge>
                        );
                      return (
                        <div
                          key={classId}
                          className="absolute ml-2 mr-2 flex w-full min-w-64 cursor-pointer flex-col justify-between space-y-2 rounded-md border bg-offset p-3 transition duration-150 hover:scale-[1.01] hover:bg-white hover:shadow-md"
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
                            <div className="text-md font-medium text-accent">
                              {startTime} - {endTime}
                            </div>
                            <div className="text-md font-medium">{name}</div>
                          </div>
                          <div className="text-md flex items-end gap-2">
                            <div className="relative flex flex-1 gap-2 font-medium items-center">
                              <Image
                                className="relative h-7 w-7 rounded-full border border-gray-300"
                                fill
                                quality={100}
                                sizes='200px'
                                src={`/pet_photos/${profilePhoto}.jpg`}
                                alt={`Photo of ${name}`}
                              />
                              {pet}
                            </div>
                            {badge}
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
