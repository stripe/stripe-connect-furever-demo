'use client';

import * as React from 'react';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {
SparklesIcon
} from 'lucide-react';
import { generate } from "random-words";
import {signIn} from 'next-auth/react';
import {ArrowRight,LoaderCircle} from 'lucide-react';
import Link from 'next/link';

const QuickstartLink = () => {

    const [loading, setLoading] = React.useState(false);

    const SALON_NAMES=[
        "PawsnPampering",
        "FurryFinesse",
        "ChicCanineCuts",
        "FluffnBuffGrooming",
        "PawPrintsParlour",
        "WhiskerWhisperers",
        "TailWagginTidbits",
        "PlushPawsPampering",
        "DivineDoggyDos",
        "SnipnSpruceSalon",
        "HappyHoundsHub",
        "PurrfectlyPamperedPets",
        "ManeMajestyGrooming",
        "TailsnTanglesSalon",
        "BarknBathBoutique",
        "PetalPawsPalace",
        "FuzzyFinishGrooming",
        "FidosFreshenUp",
        "WhiskerWashGroomingStudio",
        "PawsitivelyPamperedPups",
        "PurrfectionParlour",
        "ClipnCurlCanineCare",
        "ChicPawsSalon",
        "TheGroomingLoft",
        "TailTrendsTrim",
        "PawsnPreenPampering",
        "PlushPupsParlour",
        "DivineDoggyDetails",
        "FluffnBuffBoutique",
        "PawsitivelyPamperedPups",
        "PawPrintsPreening",
        "ChicCanineCreations",
        "TailoredTressesTrim",
        "FurryFriendsFancy",
        "HeavenlyHoundsHideaway",
        "PawsnPolishParlour",
        "DivineDoggyDetails",
        "FluffnTumbleGrooming",
        "PawPrintsPruning",
        "PawsitivelyPoshPups",
        "TailoredTanglesTrim",
        "PawsnPolishPampering",
        "PawsnPreenPalace",
        "FurryFinesseSpa",
        "ChicCanineCuts",
        "FluffnBuffGroomingStudio",
        "PawPrintsParlour",
        "WhiskerWhisperers",
        "TailWagginTidbits",
        "PlushPawsPampering",
        "DivineDoggyDos",
        "SnipnSpruceSalon",
        "HappyHoundsHub",
        "PurrfectlyPamperedPets",
        "ManeMajestyGrooming",
        "TailsnTanglesSalon",
        "BarknBathBoutique",
        "PetalPawsPalace",
        "FuzzyFinishGrooming",
        "FidosFreshenUp",
        "WhiskerWashGroomingStudio",
        "PawsitivelyPamperedPups",
        "PurrfectionParlour",
        "ClipnCurlCanineCare",
        "ChicPawsSalon",
        "TheGroomingLoft",
        "TailTrendsTrim",
        "PawsnPreenPampering",
        "PlushPupsParlour",
        "DivineDoggyDetails",
        "FluffnBuffBoutique",
        "PawsitivelyPamperedPups",
        "PawPrintsPreening",
        "ChicCanineCreations",
        "TailoredTressesTrim",
        "FurryFriendsFancy",
        "HeavenlyHoundsHideaway",
        "PawsnPolishParlour",
        "DivineDoggyDetails",
        "FluffnTumbleGrooming",
        "PawPrintsPruning",
        "PawsitivelyPoshPups",
        "TailoredTanglesTrim",
        "PawsnPolishPampering",
"PawsomePoochParlour",
"DivineDoggyDooDads",
"FluffnStuffSalon",
"PamperedPawsPalace",
"PurrfectPawsParlour",
"TailWaggersTrim",
"FurryFriendsFiesta",
"WhiskerWondersWorkshop",
"DivineDoggyDetailing",
"PawsitivePampering",
"ChicCanineCoiffeur",
"TailTrendyTrim",
"PurrfectlyPrettyPooches",
"PlushPamperedPets",
"PawsnPurrParlour",
"FuzzyFancyFinishes",
"PawPrintsPurrfection",
"BarknStyleSalon",
"TidyTailsTrim",
"PawsomePreeningPalace",
"ChicChumCuts",
"FurEleganceGrooming",
"PurrfectPamperPlace",
"TailTalesTrim",
"SnipsnSudsSalon",
"FurryFriendsFest",
"PawPrintsPamperPalace",
"HeavenlyHoundsHaven",
"DivineDoggyDressing",
"FluffyFurFinishes",
"PurrfectPawsPlace",
"PawsitivelyPamperedParlor",
"ChicCanineCouture",
"TailoredTressesTrim",
"FurryFriendsFandango",
"PawsnPolishPlace",
"DivineDoggyDazzle",
"FluffnFurSalon",
"PamperedPoochParadise",
"PurrfectionPampering",
"TailTreatsTrim",
"FurryFiestaGrooming",
"PawsnPreenParlor",
"DivineDoggyDesigns",
"FluffnFoldFurcare",
"PawPrintsnPreen",
"PawsitivelyPlushParlor",
"TailoredTanglesnTrims",
"FurryFriendsFrolic",
"PawsnPamperPlace",
"DivineDoggyDemeanor",
"FluffnFancyFur",
"PamperedPetParlour",
"PurrfectPamperParadise",
"TailTidbitsTrim",
"FurryFriendsFiesta",
"PawsnPreenPalace",
"DivineDoggyDressage",
"FluffnFancyFurcare",
"PawPrintsPamperParadise",
"PawsitivelyPlushPalace",
"TailoredTanglesnPreen",
"FurryFriendsFantasy",
"PawsnPreenPalace",
"DivineDoggyDressUp",
"FluffnFancyFurcare",
"PawPrintsPamperParadise",
"PawsitivelyPlushParadise",
"TailoredTanglesnPreen",
"FurryFriendsFantasy",
"PawsnPreenParadise",
"DivineDoggyDressUp",
"FluffnFancyFurcare",
"PawPrintsPamperParadise",
"PawsitivelyPlushParadise",
"TailoredTanglesnPreen",
"FurryFriendsFantasy",
"PawsnPreenParadise",
"DivineDoggyDressUp",
"FluffnFancyFurcare",
"PawPrintsPamperParadise",
"PawsitivelyPlushParadise",
"TailoredTanglesnPreen"
    ]

    async function handleQuickstartCreation()
    {
        setLoading(true);
        const emailNumber = Math.floor(Math.random() * (1001));
        const salonName = SALON_NAMES[Math.floor(Math.random() * SALON_NAMES.length)];
        const passwordNumber = Math.floor(Math.random() * (1001));
        const passwordWords = generate({ exactly: 2, minLength: 5, maxLength: 12 });


        /* await signIn('signup', {
        email: `${salonName}_${emailNumber}@stripe.com`,
        password: `${passwordWords[0]}-${passwordWords[1]}-${passwordNumber}`,
        redirect: false,
        });

        await signIn('createprefilledaccount', {
        email: `${salonName}_${emailNumber}@stripe.com`,
        password: `${passwordWords[0]}-${passwordWords[1]}-${passwordNumber}`,
        businessName: salonName,
        redirect: true,
        }); */
    }

    const onClick = async () => {
        try {
        handleQuickstartCreation();

        } catch (error: any) {
        console.error('An error occurred when signing in', error);
        }
    };

    if (loading)
    {
        return (
        <div className="flex flex-col text-center">
            <LoaderCircle className="h-6 w-6 animate-spin  m-auto" />
            <p>Creating account...</p>
        </div>
        );
    }

    return(
        <Alert className='bg-offset'>
        <SparklesIcon className="h-6 w-6 stroke-primary" />
        <div>
          <AlertTitle>Use a demo account</AlertTitle>
          <AlertDescription>
            Skip onboarding and go directly to dashboard.
          </AlertDescription>
          <Link href="#" onClick={onClick} className="text-accent">
            <div className="flex flex-row gap-x-[4px] font-medium pt-2">
              <p>Continue</p>
              <ArrowRight className="size-5 inline mt-0.5" />
            </div>
          </Link>
        </div>
      </Alert>
        )
}


export default QuickstartLink;