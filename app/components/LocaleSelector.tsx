import {useContext, useCallback} from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {LocaleType, Locales} from '@/types/settings';
import {SettingsContext} from '@/app/contexts/settings';

type LocaleProps = {
  localeUpdated?: () => void;
};

const LocaleSelector = ({localeUpdated}: LocaleProps) => {
  const settings = useContext(SettingsContext);

  const setLocale = useCallback(
    (value: LocaleType) => {
      settings.handleUpdate({locale: value});
      if (localeUpdated) {
        localeUpdated();
      }
    },
    [localeUpdated, settings]
  );

  // Find the locale display name
  const locale =
    Locales.find((l) => l.locale === settings.locale) || Locales[0]!;

  return (
    <Select value={locale.locale} onValueChange={setLocale}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Locale">{locale.label}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Locales.map(({locale, label}) => (
          <SelectItem value={locale} key={locale}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LocaleSelector;
