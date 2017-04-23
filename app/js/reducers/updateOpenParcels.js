export default function(state = [], action){
  switch(action.type){
    case "openParcels":
      return (action.payload) ? action.payload : [];
  }
  return state;
}
