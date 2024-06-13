'use client';

import {useSession} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import Stripe from '@/public/stripe-gray.svg';
import {
  Home as HomeIcon,
  Wallet as WalletIcon,
  Coins as CoinsIcon,
  Landmark as LandmarkIcon,
  Dog as PetsIcon,
  Settings as SettingsIcon,
  Sparkles as SparklesIcon,
  Menu as MenuIcon,
  File as FileIcon,
  PanelLeftClose,
} from 'lucide-react';
import {Button} from '@/components/ui/button';
import FureverLogo from '@/public/furever_logo.png';
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
import {useToolsContext} from '../hooks/ToolsPanelProvider';
import * as React from 'react';
import CreatePaymentsButton from './testdata/CreatePaymentsButton';
import LocaleSelector from './Tools/LocaleSelector';
import ThemePicker from './Tools/ThemePicker';
import OverlaySelector from './Tools/OverlaySelector';
import CreateInterventionsButton from './testdata/CreateInterventionsButton';
import CreatePayoutsButton from './testdata/CreatePayoutsButton';
import CreateFinancialCreditButton from './testdata/CreateFinancialCreditButton';

const ToolsPanel = () => {
  const pathname = usePathname();
  const {data: session} = useSession();

  const stripeAccount = session?.user?.stripeAccount;

  const [showMobileNavItems, setShowMobileNavItems] = React.useState(false);
  const {handleEnableBorderChange, enableBorder} = useEmbeddedComponentBorder();
  const {handleOpenChange} = useToolsContext();
  const [border, setBorder] = React.useState(true);
  const [theme, setTheme] = React.useState('light');
  const [locale, setLocale] = React.useState('english');
  const [overlay, setOverlay] = React.useState('dialog');

  const actions = [
    {
      description: 'Create a test payment',
      href: '/payments',
      component: CreatePaymentsButton,
    },
    {
      description: 'Create a checkout session',
      href: '/payments',
    },
    {
      description: 'Create a test payout',
      href: '/payouts',
      component: CreatePayoutsButton,
    },
    {
      description: 'Simulate a risk intervention',
      href: '/settings',
      component: CreateInterventionsButton,
    },
    {
      description: 'Simulate a risk intervention',
      href: '/home',
      component: CreateInterventionsButton,
    },
    {
      description: 'Create a test financial credit',
      href: '/finances',
      component: CreateFinancialCreditButton,
    },
  ];

  const CustomTools = () => {
    return (
      <div className="mt-4 flex flex-col items-stretch">
        {actions.map(
          (action) =>
            pathname.includes(action.href) &&
            action.component && (
              // <Button
              //   className="my-1 rounded-lg border border-[#D8DEE4] bg-white py-1 text-sm font-medium shadow"
              //   variant="secondary"
              //   key={action.description}
              // >
              //   {action.description}
              // </Button>
              <action.component key={action.description} />
            )
        )}
      </div>
    );
  };

  const DefaultTools = () => {
    return (
      <div className="my-6 flex flex-col gap-y-4 text-lg font-medium">
        <div className="flex flex-row justify-between rounded-lg">
          <Label className="text-left" htmlFor="outline">
            Component outlines
          </Label>
          <Switch
            className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-[#EBEEF1]"
            id="outline"
            checked={border}
            onCheckedChange={() => handleEnableBorderChange(!border)}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Label className="text-left" htmlFor="theme">
            Theme
          </Label>
          <ThemePicker />
        </div>
        <div className="flex flex-row justify-between">
          <Label className="text-left align-middle" htmlFor="outline">
            Locale
          </Label>
          <LocaleSelector />
        </div>
        {/* <div className="flex flex-row justify-between">
          <Label className="text-left" htmlFor="outline">
            Overlay style
          </Label>
          <OverlaySelector />
        </div> */}
      </div>
    );
  };

  React.useEffect(() => {
    setBorder(enableBorder);
  }, [enableBorder]);

  return (
    <div className="z-200 flex h-full w-full flex-col justify-between bg-tools-background p-5">
      <div>
        <div className="flex gap-x-2 text-xl font-bold text-primary">
          <Sparkles size={24} />
          Tools
        </div>
        <DefaultTools />
        <hr />
        <div className="my-4 flex gap-x-2 text-xl font-bold text-primary">
          <FileIcon size={24} />
          On this page
        </div>
        <CustomTools />
      </div>
      <div className="flex-co flex justify-between">
        <Image src={Stripe} alt="stripe logo" height={24} />
        <Button
          variant="secondary"
          className="px-[10px] py-[9px] text-sm"
          onClick={() => handleOpenChange(false)}
        >
          <PanelLeftClose className="mr-2" />
          Close{' '}
        </Button>
      </div>
    </div>
  );
};

export default ToolsPanel;
