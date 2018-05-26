import {actionTypes} from "./flights-action";

const DEFAULT_SEARCH_RESULTS = {
    departFlights:[],
    returnFlights:[],
    searchQuery: {
        from: '',
        to: '',
        depart: '',
        returnDate: '',
        passenger: '',
        roundTrip: false
    },
    maxPrice: 0
};

const updateSearchResults = (state, payload) => {
    return {
        ...state,
        ...payload
    }
};

export default (state = DEFAULT_SEARCH_RESULTS, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_FLIGHTS_SUCCESS:
            return updateSearchResults(state, action.payload);
        default:
            return state;
    }
}