import {useState} from 'react';
import {Globe} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Container from '@/app/components/Container';

const changeLocale = async () => {
  return [null, RenderActionMenu];
};

const RenderActionMenu = (exit: () => void, settings: any) => {
  function setLocale(value: string) {
    settings.handleUpdate({locale: value});
    exit();
  }

  return (
    <Container>
      <h1 className="text-lg font-bold">Set locale</h1>
      <Select value={settings.locale} onValueChange={setLocale}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme">{settings.locale}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en-US">US</SelectItem>
          <SelectItem value="fr_FR">France</SelectItem>
          <SelectItem value="ko-KR">South Korea</SelectItem>
        </SelectContent>
      </Select>
    </Container>
  );
};

const config = {
  name: 'Change locale',
  icon: Globe,
  description: 'Changes the browser locale.',
  action: changeLocale,
};

export default config;
