import {flights} from "../../util/db-util";
import {searchFlightsSuccess} from "./flights-action";

export const getFlights = (store, searchQuery) => {
    console.log(searchQuery);
    //mocking service/api call where we query the db
    let maxPrice = Number.NEGATIVE_INFINITY;
    let departFlights = [];
    let returnFlights = [];
    for (let flight of flights) {
        if (flight.from === searchQuery.from
            && flight.to === searchQuery.to
            && flight.date === searchQuery.depart
            && Number(flight.seatsAvailable) >= Number(searchQuery.passenger)
            ) {
            departFlights.push(flight);
            maxPrice = flight.price > maxPrice ? flight.price : maxPrice;
        }
        if (searchQuery.roundTrip) {
            if (flight.from === searchQuery.to
                && flight.to === searchQuery.from
                && flight.date === searchQuery.returnDate
                && Number(flight.seatsAvailable) >= Number(searchQuery.passenger)
                ) {
                returnFlights.push(flight);
                maxPrice = flight.price > maxPrice ? flight.price : maxPrice;
            }
        }
    }

    let payload = {
        departFlights: departFlights,
        returnFlights: returnFlights,
        maxPrice,
        searchQuery
    };
    console.log('p', payload)
    store.dispatch(searchFlightsSuccess(payload));
};

