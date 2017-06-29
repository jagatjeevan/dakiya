import i18next from 'i18next';
import i18nextXhr from 'i18next-xhr-backend';
import i18nextLangDetector from 'i18next-browser-languagedetector';
import Cookie from 'js-cookie';
import appConfig from '../appConfig';

const supportedlanguages = [
  'en',
  'fr',
];

class I18nTranslator {
  constructor() {
    this.translator = null;
  }

  initiateTranslator(resolve) {
    return new Promise(() => {
      let langToDisplay;
      if (!Cookie.get('lang')) {
        langToDisplay = 'en';
      } else {
        langToDisplay = (supportedlanguages.filter(lang => lang === Cookie.get('lang')).length > 0) ? Cookie.get('lang') : 'en';
      }
      i18next
        .use(i18nextXhr)
        .use(i18nextLangDetector)
        .init({
          fallbackLng: 'en',
          backend: {
            loadPath: `${appConfig.translationFolder}/${langToDisplay}/translation.json`,
          },
          detection: {
            order: ['cookie'],
            caches: [],
            lookupCookie: 'lang',
          },
        }, (err, t) => {
          if (err) {
            /* eslint no-console: 0 */
            console.log('something went wrong in translation', err);
          } else {
            this.translator = t;
            resolve();
          }
        });
    });
  }

  translate(key) {
    if (!this.translator) {
      throw new Error('Translator not initialized');
    }
    return this.translator(key);
  }
}

const translatorInstance = new I18nTranslator();

export default translatorInstance;
