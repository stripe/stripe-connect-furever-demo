import Image from 'next/image';
import Container from '@/app/components/Container';
import BackgroundImage from '@/public/background.jpg';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex min-h-screen py-[120px] px-6 min-w-[926px] justify-center space-x-20">
        <div className="w-[850px] flex">
          <div className="max-w-sm space-y-4 fixed">
            <Image className="inline-block mb-4" src="pose_red.svg" alt="Pose" width={150} height={23} />
            <h1 className="text-4xl font-bold">
              Manage your fitness studio with ease.
            </h1>
            <p className="text-xl">Pose is the world&apos;s leading health and wellness platform.</p>
          </div>
          <div className="min-w-96 ml-auto">
            <Container className="rounded-[16px] no-scrollbar overflow-scroll">
              {children}
            </Container>
          </div>
        </div>
      </div>
      <Image
        src={BackgroundImage}
        alt="logo"
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        className="fixed z-[-1] h-full w-full overflow-hidden object-cover min-w-[926px]"
      />
    </>
  );
}
