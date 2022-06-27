import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';


i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    
    fallbackLng:'fr' ,
    detection:{
      order:['cookie','htmlTag','localStorage','path','subdomain'],
      caches:['cookie'],
    },
    backend: { loadPath: '/translation/{{lng}}.json' },
    react:{
      useSuspense: false,

    }
  });

export default i18next;
