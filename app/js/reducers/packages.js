
import {
	REQUEST_PACKAGES,
	RECEIVE_PACKAGES,
} from '../actions/packages';


const initialState = {
	isFetching: false,
	items: [
	]
};

export default function packages(state = initialState, action) {
	switch (action.type) {
		case REQUEST_PACKAGES:
			return Object.assign({}, state, {isFetching: true })
		case RECEIVE_PACKAGES:
			return Object.assign(
				{},
				state,
				{
					isFetching: false,
					items: action.packages
				});
		default:
			return state;
	}
}

