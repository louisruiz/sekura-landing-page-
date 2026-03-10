import 'server-only'

const dictionaries = {
  fr: () => import('../locales/fr.json').then((module) => module.default),
  en: () => import('../locales/en.json').then((module) => module.default),
  es: () => import('../locales/es.json').then((module) => module.default),
  pt: () => import('../locales/pt.json').then((module) => module.default),
}

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: string): Promise<any> => {
  const l = locale as Locale;
  // Fallback to 'fr' if locale unsupported
  return dictionaries[l] ? dictionaries[l]() : dictionaries['fr']();
}
