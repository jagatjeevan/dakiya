let mountPath = window.config.mountPath;
let imagePath = `${mountPath}img`;

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
