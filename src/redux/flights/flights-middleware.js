import {actionTypes} from "./flights-action";
import {getFlights} from "./flights-service";

export default store => next => action => {
    switch (action.type) {
        case actionTypes.SEARCH_FLIGHTS:
            getFlights(store, action.searchQuery);
            break;
        default:
            next(action);
    }
}