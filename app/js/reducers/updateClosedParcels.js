export default function(state = [], action){
  switch(action.type){
    case "closedParcels":
    return (action.payload) ? action.payload : [];
  }
  return state;
}
