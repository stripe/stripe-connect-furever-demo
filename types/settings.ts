export type LocaleType =
  | 'bg-BG'
  | 'cs-CZ'
  | 'da-DK'
  | 'de-DE'
  | 'el-GR'
  | 'en-GB'
  | 'en-US'
  | 'es-419'
  | 'es-ES'
  | 'et-EE'
  | 'fi-FI'
  | 'fil-PH'
  | 'fr-CA'
  | 'fr-FR'
  | 'hr-HR'
  | 'hu-HU'
  | 'id-ID'
  | 'it-IT'
  | 'ja-JP'
  | 'ko-KR'
  | 'lt-LT'
  | 'lv-LV'
  | 'ms-MY'
  | 'mt-MT'
  | 'nb-NO'
  | 'nl-NL'
  | 'pl-PL'
  | 'pt-BR'
  | 'pt-PT'
  | 'ro-RO'
  | 'sk-SK'
  | 'sl-SI'
  | 'sv-SE'
  | 'th-TH'
  | 'tr-TR'
  | 'vi-VN'
  | 'zh-Hans'
  | 'zh-Hant-HK'
  | 'zh-Hant-TW';

// https://docs.google.com/spreadsheets/d/1-Bu7w2kuBYPXinuTdxrt3T8scrNaMxL8elSJr9aiVtE/edit#gid=0
export const Locales: Array<{locale: LocaleType; label: string}> = [
  {label: 'English (US)', locale: 'en-US'},
  {label: 'Bahasa Indonesia', locale: 'id-ID'},
  {label: 'čeština', locale: 'cs-CZ'},
  {label: 'Dansk', locale: 'da-DK'},
  {label: 'Deutsch', locale: 'de-DE'},
  {label: 'Eesti', locale: 'et-EE'},
  {label: 'English (Hong Kong) ', locale: 'en-GB'},
  {label: 'English (UK)', locale: 'en-GB'},
  {label: 'Español (América Latina)', locale: 'es-419'},
  {label: 'Español (España)', locale: 'es-ES'},
  {label: 'Filipino', locale: 'fil-PH'},
  {label: 'Français (Canada)', locale: 'fr-CA'},
  {label: 'Français (France)', locale: 'fr-FR'},
  {label: 'hrvatski', locale: 'hr-HR'},
  {label: 'Italiano', locale: 'it-IT'},
  {label: 'Latviešu', locale: 'lv-LV'},
  {label: 'Lietuvių', locale: 'lt-LT'},
  {label: 'Magyar', locale: 'hu-HU'},
  {label: 'Malti', locale: 'mt-MT'},
  {label: 'Melayu', locale: 'ms-MY'},
  {label: 'Nederlands', locale: 'nl-NL'},
  {label: 'Norsk bokmål', locale: 'nb-NO'},
  {label: 'Polski', locale: 'pl-PL'},
  {label: 'Português (Brasil)', locale: 'pt-BR'},
  {label: 'Português (Portugal)', locale: 'pt-PT'},
  {label: 'Română', locale: 'ro-RO'},
  {label: 'Slovenčina', locale: 'sk-SK'},
  {label: 'Slovenščina', locale: 'sl-SI'},
  {label: 'Suomi', locale: 'fi-FI'},
  {label: 'Svenska', locale: 'sv-SE'},
  {label: 'Tiếng Việt', locale: 'vi-VN'},
  {label: 'Türkçe', locale: 'tr-TR'},
  {label: 'ελληνικά', locale: 'el-GR'},
  {label: 'Български', locale: 'bg-BG'},
  {label: 'ไทย', locale: 'th-TH'},
  {label: '한국어', locale: 'ko-KR'},
  {label: '中文（香港)', locale: 'zh-Hant-HK'},
  {label: '日本語', locale: 'ja-JP'},
  {label: '简体中文', locale: 'zh-Hans'},
  {label: '臺灣華語', locale: 'zh-Hant-TW'},
];

export interface Settings {
  locale: LocaleType;
}
