"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ImageStep1 from '@/public/onboarding-images/step-1.png';
import ImageStep2 from '@/public/onboarding-images/step-2.png';
import ImageStep3 from '@/public/onboarding-images/step-3.png';
import PointingHand from '@/public/onboarding-images/pointinghand.png';
import { ArrowRight } from "lucide-react";
import { useSearchParams } from 'next/navigation'
import * as React from 'react';

const OnboardingDialog = () => {
  // Look for showNux query param in the URL.
  const searchParams = useSearchParams();
  let showNux = searchParams.get('shownux') === 'true';

  // Check browser width, and don't show NUX if on mobile device.
  window.innerWidth < 640 ? showNux = false : "";

  const [openNux, setOpenNux] = React.useState(showNux);
  const [currentStep, setCurrentStep] = React.useState(0);

  const onboardingSteps = [
    {
      "title": "Welcome to Furever!",
      "description": "Take a quick tour to learn more.",
      "imageClassName": "scale-[0.85]",
      "cursorClassName": "opacity-0",
      "imageURL": ImageStep1,
    }, {
      "title": "Eplore components on different pages.",
      "description": "Components can be found in Payments, Payouts, Finances, and My Account.",
      "imageClassName": "scale-[1.6] translate-x-[280px] translate-y-[25px]",
      "cursorClassName": "opacity-100 translate-x-[60px] translate-y-[-160px]",
      "imageURL": ImageStep2,
    }, {
      "title": "View component outlines",
      "description": "Turn on borders to visualize embedded components in dashboard.",
      "imageClassName": "scale-[1.8] translate-x-[450px] translate-y-[-450px]",
      "cursorClassName": "opacity-100 translate-x-[208px] translate-y-[-75px]",
      "imageURL": ImageStep3,
    }
  ]

  const DecrementButon = () => {
    // If user is at first step, show a close button
    if (currentStep == 0) {
      return (
        <DialogClose asChild>
          <Button type="button" variant="secondary" autoFocus={false}>
            Close
          </Button>
        </DialogClose>
      )
    }

    // If not, show a back button
    return (
      <Button
        variant="secondary"
        onClick={() => setCurrentStep(currentStep - 1)}
      >
        Back
      </Button>
    )
  }

  const IncrementButton = () => {
    if (currentStep == onboardingSteps.length - 1) {
      return (
        <DialogClose asChild>
          <Button
            className="gap-1 items-center bg-gradient-to-r from-[#7F81FA] to-[#5AA5F2] hover:opacity-90"
            autoFocus={true}
          >
            Finish
            <ArrowRight size={20} />
          </Button>
        </DialogClose>
      )
    }

    return (
      <Button
        onClick={() => setCurrentStep(currentStep + 1)}
        className="gap-1 items-center bg-gradient-to-r from-[#7F81FA] to-[#5AA5F2] hover:opacity-90"
      >
        Continue
        <ArrowRight size={20} />
      </Button>
    )
  }

  const ProgressIndicator = () => {
    const progressDot = (isActive: boolean) => {
      const bg = isActive ? "bg-[#675DFF]" : "bg-neutral-200"
      return <div className={`w-2.5 h-2.5 rounded-full ${bg}`}></div>
    }

    return (
      <div className="flex gap-3">
        { progressDot(currentStep >= 0) }
        { progressDot(currentStep >= 1) }
        { progressDot(currentStep >= 2) }
      </div>
    )
  }

  return (
    <>
      <Dialog open={openNux} onOpenChange={setOpenNux}>
        <DialogContent className="max-w-[none] w-[700px] p-0 gap-0 overflow-hidden border-0">
          <div className="w-full h-[300px] overflow-hidden border-b relative bg-gradient-to-tr from-[#CCCCFD] to-[#B0E9F7]">
            <Image
              src={onboardingSteps[currentStep].imageURL}
              alt="Image of the Furever website"
              placeholder="blur"
              quality={100}
              sizes="100vw"
              priority
              className={`overflow-hidden rounded-xl object-cover shadow-lg transition duration-700 ease-in-out
                ${onboardingSteps[currentStep].imageClassName}`
              }
            />
            <Image
              src={PointingHand}
              alt="Pointer cursor"
              priority
              className={`w-14 h-14 absolute transition duration-700 right-3/4 bottom-[-20px] ${onboardingSteps[currentStep].cursorClassName}`}
            />
          </div>
          <DialogHeader className="p-5">
            <DialogTitle className="text-2xl">{onboardingSteps[currentStep].title}</DialogTitle>
            <DialogDescription className="text-lg">
              {onboardingSteps[currentStep].description}
            </DialogDescription>
            <div className="flex flex-1 pt-4 gap-2 items-center justify-between">
              <ProgressIndicator />
              <div className="flex gap-2">
                <DecrementButon />
                <IncrementButton />
              </div>
            </div>

          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OnboardingDialog;
