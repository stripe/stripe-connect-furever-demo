import studios from '@/app/data/studios.json';
import {Button} from '@/components/ui/button';
import Container from '@/app/components/Container';
import Image from 'next/image';

import {
  CalendarPlus as PlusIcon,
  Pencil as PencilIcon,
  Trash2 as TrashIcon
} from 'lucide-react';

const getDate = (daysFromToday: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);

  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  } as Intl.DateTimeFormatOptions;
  return date.toLocaleDateString('en-US', options)
};

const renderClassRow = (
  item: {
    name: string,
    studio: string,
    startTime: string,
    endTime: string,
    teacher: string,
    profilePhoto: string
  }) => {
    return (
      <Container className="flex py-4 gap-5 hover:shadow-lg cursor-pointer transition items-center">
        <div className="font-medium text-secondary w-[180px]">{item.startTime} - {item.endTime}</div>
        <div className="flex-1 min-w-[200px]">
          <div className="font-bold">{item.name}</div>
          <div className="text-subdued">Studio {item.studio}</div>
        </div>
        <div className="flex flex-1 items-center relative gap-2">
          <Image
            className="w-7 h-7 relative rounded-full"
            fill
            quality={100}
            src={`/headshots/${item.profilePhoto}.jpg`}
            alt={`Profile photo of ${item.name}`}
          />
          {item.teacher}
        </div>
        <div className="flex gap-6">
          <PencilIcon className="w-5 h-5" color="var(--secondary)"></PencilIcon>
          <TrashIcon className="w-5 h-5" color="var(--secondary)"></TrashIcon>
        </div>
      </Container>
    );
};

export default function Classes() {
  const classes = studios[0].classes.concat(studios[1].classes);
  classes.sort((a, b) => a.startTimeMinutes - b.startTimeMinutes);

  return (
    <>
      <div className="flex gap-3">
        <h1 className="text-3xl font-bold flex-1">Classes</h1>
        <Button className="bg-[#312356] font-bold gap-2 shadow text-base hover:shadow-md transition">
          <PlusIcon className="w-5 h-5"></PlusIcon>
          Create class
        </Button>
        <Button className="bg-white text-primary font-medium gap-2 shadow text-base hover:shadow-md transition">
          <PencilIcon className="w-5 h-5"></PencilIcon>
          Edit studios
        </Button>
      </div>
      <div className="flex gap-3 text-xl pt-4">
        <h2 className="font-bold">Today</h2>
        <span className="font-normal text-subdued">{getDate(0)}</span>
      </div>
      <div className="flex flex-col gap-y-3">
        {
          classes.map((item) => {
            return renderClassRow(item);
          })
        }
      </div>
      <div className="flex gap-3 text-xl pt-8">
        <h2 className="font-bold">Tomorrow</h2>
        <span className="font-normal text-subdued">{getDate(1)}</span>
      </div>
      <div className="flex flex-col gap-y-3">
        {
          classes.map((item) => {
            return renderClassRow(item);
          })
        }
      </div>
    </>
  );
}
