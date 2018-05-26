export const actionTypes = {
    SEARCH_FLIGHTS: 'SEARCH_FLIGHTS',
    SEARCH_FLIGHTS_SUCCESS: 'SEARCH_FLIGHTS_SUCCESS',
    SEARCH_FLIGHTS_FAILED: 'SEARCH_FLIGHTS_FAILED'
};

export const searchFlights = (searchQuery) => {
    return {
        type: actionTypes.SEARCH_FLIGHTS,
        searchQuery: searchQuery
    }
};

export const searchFlightsSuccess = (payload) => {
    return {
        type: actionTypes.SEARCH_FLIGHTS_SUCCESS,
        payload: payload
    }
};

