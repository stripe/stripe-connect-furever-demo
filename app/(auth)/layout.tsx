import Image from 'next/image';
import Container from '@/app/components/Container';
import BackgroundImage from '@/public/background.png';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen space-x-20">
        <div className="max-w-sm  space-y-8">
          <Image src="pose_red.svg" alt="Pose" width={150} height={23} />
          <h1 className="text-4xl font-bold">
            Manage your fitness studio with ease
          </h1>
          <p>Pose is the world&apos;s leading health and wellness platform.</p>
        </div>
        <div className="min-w-96">
          <Container className="max-h-[calc(100vh-2rem)] overflow-scroll no-scrollbar">
            {children}
          </Container>
        </div>
      </div>
      <Image
        src={BackgroundImage}
        alt="logo"
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        className="fixed w-full h-full object-cover z-[-1] overflow-hidden"
      />
    </>
  );
}
