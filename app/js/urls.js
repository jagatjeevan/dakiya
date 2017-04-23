let basePath='';
if(window.location.hostname.includes('github')){
  basePath= '/mailapp/';
}else{
  basePath='/';
  // Setting localStorage for dummy data.
  localStorage.setItem('getFromServer', true);
}

let imagePath = `${basePath}img`;
let search, openParcels, closedParcels;

if(!localStorage.getItem('getFromServer')) {
  search = 'http://mailbox-1.eastus.cloudapp.azure.com/api/users/search?q=';
  openParcels = 'http://mailbox-1.eastus.cloudapp.azure.com/api/parcels/open';
  closedParcels = 'http://mailbox-1.eastus.cloudapp.azure.com/api/parcels/closed';
} else {
  search = '/server/search.json';
  openParcels = '/server/openParcel.json';
  closedParcels = '/server/closedParcel.json';
}

export default {
  // Routes
  basePath,
  homePage: basePath,
  addParcelPage: 'addParcel',

  // Apis
  search,
  openParcels,
  closedParcels,

  // Other static assets path
  imagePath,

  // i18n Translations
  translationFolder: 'locale',
}
