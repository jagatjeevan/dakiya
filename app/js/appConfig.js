let basePath='';
if(window.location.hostname.includes('github')){
  basePath= '/mailapp/';
}else{
  basePath='/';
}

let imagePath = `${basePath}img`;

export default {
  // Routes
  basePath: basePath,
  addParcel: 'addParcel',

  // Other assets
  imagePath,

  // i18n Translations
  translationFolder: 'locale',
}
