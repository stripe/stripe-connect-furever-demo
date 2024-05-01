import {Button} from '@/components/ui/button';
import Image from 'next/image';
import Container from '@/app/components/Container';
import pets from '@/app/data/pets.json';

import {
  Plus as PlusIcon,
  Phone as PhoneIcon,
  Mail as EmailIcon,
} from 'lucide-react';

export default function Pets() {
  return (
    <>
      <div className="flex">
        <h1 className="flex-1 text-3xl font-bold">Pets</h1>
        <Button className="gap-2 bg-accent text-base font-bold text-accent-foreground transition">
          <PlusIcon size={20}></PlusIcon>
          New Pet
        </Button>
      </div>
      <div className="grid gap-5 sm:grid-cols-3 xl:grid-cols-4">
        {pets.map((pet, key) => {
          return (
            <Container
              className="relative flex cursor-pointer flex-col items-center gap-4 overflow-hidden transition duration-200 hover:scale-[1.01] hover:shadow-lg"
              key={key}
            >
              <Image
                className="relative h-[200px] w-full rounded-lg object-cover"
                fill
                quality={100}
                src={`/pet_photos/${pet.profilePhoto}.jpg`}
                alt={`Profile photo of ${pet.name}`}
              />
              <div className="flex w-full items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{pet.name}</h3>
                  <p className="text-sm text-subdued">
                    Birthday: {pet.birthday}
                  </p>
                </div>
                <div className="flex gap-5">
                  <PhoneIcon size={24} color="var(--accent)" />
                  <EmailIcon size={24} color="var(--accent)" />
                </div>
              </div>
            </Container>
          );
        })}
      </div>
    </>
  );
}
