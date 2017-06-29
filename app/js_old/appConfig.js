const mountPath = (window.config.mountPath) ? window.config.mountPath : '/';
const imagePath = `${mountPath}img`;

export default {
  ApiBaseURL: window.config.apiBaseURL,
  XParseApplicationId: window.config.xParseApplicationId,
  XParseMasterKey: window.config.xParseMasterKey,

  // Routes
  homePage: mountPath,
  addParcelPage: 'addParcel',

  // Other static assets path
  imagePath,

  // i18n Translations
  translationFolder: 'locale',
};
