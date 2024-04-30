import {Button} from '@/components/ui/button';
import Image from 'next/image';
import Container from '@/app/components/Container';
import pets from '@/app/data/pets.json';

import {
  Plus as PlusIcon,
  Phone as PhoneIcon,
  Mail as EmailIcon
} from 'lucide-react';

export default function Pets() {

  return (
    <>
      <div className="flex">
        <h1 className="text-3xl font-bold flex-1">Pets</h1>
        <Button className="bg-accent text-accent-foreground font-bold gap-2 text-base transition">
          <PlusIcon size={20}></PlusIcon>
          New Pet
        </Button>
      </div>
      <div className="grid sm:grid-cols-3 xl:grid-cols-4 gap-5">
        {
          pets.map((pet, key) => {
            return (
              <Container className="relative flex flex-col items-center gap-4 hover:scale-[1.01] hover:shadow-lg transition duration-200 cursor-pointer overflow-hidden" key={key}>
                <Image
                  className="w-full h-[200px] rounded-lg relative object-cover"
                  fill
                  quality={100}
                  src={`/pet_photos/${pet.profilePhoto}.jpg`}
                  alt={`Profile photo of ${pet.name}`}
                />
                <div className="flex w-full items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{pet.name}</h3>
                    <p className="text-subdued text-sm">Birthday: {pet.birthday}</p>
                  </div>
                  <div className="flex gap-5">
                    <PhoneIcon size={24} color="var(--accent)" />
                    <EmailIcon size={24} color="var(--accent)" />
                  </div>
                </div>
              </Container>
            )
          })
        }
      </div>
    </>
  )
}
