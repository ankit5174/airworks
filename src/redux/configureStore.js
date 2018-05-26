import {createStore, combineReducers, applyMiddleware} from 'redux';
import flightsReducer from './flights/flights-reducer';
import flightsMiddleware from './flights/flights-middleware';

export function configureStore() {
    return createStore(
        combineReducers({
            flightsReducer
        }),
        applyMiddleware(
            flightsMiddleware
        )
    );
}