import {Button} from '@/components/ui/button';
import Image from 'next/image';
import Container from '@/app/components/Container';
import instructors from '@/app/data/instructors.json';

import {
  UserRoundPlus as PlusIcon,
  Phone as PhoneIcon,
  Mail as EmailIcon
} from 'lucide-react';

export default function Pets() {

  return (
    <>
      <div className="flex">
        <h1 className="text-3xl font-bold flex-1">Pets</h1>
        <Button className="bg-accent text-accent-foreground font-bold gap-2 shadow text-base hover:shadow-md transition">
          <PlusIcon size={20}></PlusIcon>
          Add Pet
        </Button>
      </div>
      <div className="grid sm:grid-cols-3 xl:grid-cols-4 gap-4">
        {
          instructors.map((instructor) => {
            return (
              <Container className="relative flex flex-col items-center gap-4 hover:shadow-lg transition cursor-pointer" key={instructor.id}>
                <Image
                  className="w-[80px] h-[80px] relative rounded-full shadow"
                  fill
                  quality={100}
                  src={`/headshots/${instructor.profilePhoto}.jpg`}
                  alt={`Profile photo of ${instructor.name}`}
                />
                <div className="flex flex-col items-center">
                  <h3 className="font-medium text-lg">{instructor.name}</h3>
                  <p className="text-subdued text-sm">{instructor.numClasses} class{instructor.numClasses == 1 ? '' : 'es'} this week</p>
                </div>
                <div className="flex gap-5">
                  <PhoneIcon size={20} color="var(--accent)" />
                  <EmailIcon size={20} color="var(--accent)" />
                </div>
              </Container>
            )
          })
        }
      </div>
    </>
  )
}
