import {airports} from "./db-util";
import airasia from '../resources/airasia.png';
import airindia from '../resources/airindia.jpg';
import goair from '../resources/goair.jpg';
import indigo from '../resources/indigo.jpg';
import spicejet from '../resources/spicejet.png';

export const validateForm = (target, roundTrip) => {
    let from = target.from.value;
    let to = target.to.value;
    let depart = target.depart.value;
    let returnDate = target.returnDate.value;
    let passenger = target.passenger.value;

    let valid = false;
    if (roundTrip && returnDate === '') {
        return valid;
    }

    if (from !== '' && to !== '' && depart !== '' && passenger !== '' && from !== to && Number(passenger)>0) {
        valid = true;
    }

    return valid;

};

export const getDisplayAirports = (airports) => {

    let displaylabel = airports.map((airport) => {
        return {
            label: airport.city + ' ' + airport.code
        };
    });
    return displaylabel;
};


export const getAirportCode = (city) => {
    let airport = airports.find(item => {
        return item.city === city
    });

    return airport.code;
};

export const getAirlineLogo = (airlines) => {
    if (airlines === 'airasia') {
        return airasia;
    } else if (airlines === 'spicejet') {
        return spicejet;
    } else if (airlines === 'Go Air') {
        return goair;
    } else if (airlines === 'air india') {
        return airindia;
    } else if (airlines === 'indigo') {
        return indigo;
    }

};