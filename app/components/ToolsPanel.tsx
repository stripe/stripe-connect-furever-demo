'use client';

import {useSession} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {
  Home as HomeIcon,
  Wallet as WalletIcon,
  Coins as CoinsIcon,
  Landmark as LandmarkIcon,
  Dog as PetsIcon,
  Settings as SettingsIcon,
  Sparkles as SparklesIcon,
  Menu as MenuIcon,
} from 'lucide-react';
import {Button} from '@/components/ui/button';
import FureverLogo from '@/public/furever_logo.png';
import Stripe from 'stripe';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radiogroup';
import {Sparkles} from 'lucide-react';
import {useEmbeddedComponentBorder} from '../hooks/EmbeddedComponentBorderProvider';
import * as React from 'react';

const ToolsPanel = () => {
  const pathname = usePathname();
  const {data: session} = useSession();

  const stripeAccount = session?.user?.stripeAccount;

  const [showMobileNavItems, setShowMobileNavItems] = React.useState(false);
  const {handleEnableBorderChange, enableBorder} = useEmbeddedComponentBorder();
  const [border, setBorder] = React.useState(true);

  React.useEffect(() => {
    setBorder(enableBorder);
  }, [enableBorder]);

  return (
    <div className="h-full w-full">
      <div className="flex text-xl font-bold text-primary">
        <Sparkles size={24} />
        Tools
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between rounded-lg text-sm font-medium">
          <Label className="text-left" htmlFor="outline">
            Component outlines
          </Label>
          <Switch
            className="mr-3 data-[state=checked]:bg-accent data-[state=unchecked]:bg-[#EBEEF1]"
            id="outline"
            checked={border}
            onCheckedChange={() => handleEnableBorderChange(!border)}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Label className="text-left" htmlFor="theme">
            Theme
          </Label>
          <RadioGroup defaultValue="option-one" id="theme">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="border border-primary bg-white"
                value="white"
                id="white"
              />
              <RadioGroupItem
                className="bg-[#424242]"
                value="black"
                id="black"
              />
              <RadioGroupItem
                className="bg-[#008080]"
                value="mspaint"
                id="mspaint"
              />
            </div>
          </RadioGroup>
        </div>
        <div className="flex flex-row justify-between">
          <Label className="text-left" htmlFor="outline">
            Locale
          </Label>
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="english">English&#40;us&#41;</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row justify-between">
          <Label className="text-left" htmlFor="outline">
            Overlay style
          </Label>
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Dialog" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dialog">Dialog</SelectItem>
              <SelectItem value="drawer">Drawer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ToolsPanel;
