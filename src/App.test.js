import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import { expect } from 'chai';
import {Provider} from 'react-redux';
import {configureStore} from "./redux/configureStore";
import App from './App';
import SearchResults from './pages/search-results/search-results';
import SideNavBar from './components/side-nav-bar/side-nav-bar';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jsdom from 'jsdom'

const doc = jsdom.jsdom('<!doctype html><html><body/></html>');
global.document = doc
global.window = doc.defaultView

Enzyme.configure({ adapter: new Adapter() });

let store = configureStore();

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><App/></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders search-results page based on query from home page', () => {
    let departFlights = [
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'airasia',
            departTime: '09:00',
            arrivalTime: '10:00',
            price: '4000',
            seatsAvailable: '50'
        },
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'indigo',
            departTime: '10:00',
            arrivalTime: '12:00',
            price: '3000',
            seatsAvailable: '50'
        },
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'air india',
            departTime: '12:00',
            arrivalTime: '13:00',
            price: '2000',
            seatsAvailable: '50'
        },
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'air india',
            departTime: '14:00',
            arrivalTime: '15:00',
            price: '1000',
            seatsAvailable: '50'
        },
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'air india',
            departTime: '15:00',
            arrivalTime: '16:00',
            price: '1500',
            seatsAvailable: '50'
        },
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'spicejet',
            departTime: '15:00',
            arrivalTime: '16:00',
            price: '2500',
            seatsAvailable: '50'
        },
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'Go Air',
            departTime: '15:00',
            arrivalTime: '16:00',
            price: '6000',
            seatsAvailable: '50'
        }
    ];

    let returnFlights = [];
    let searchQuery = {
        from: 'Raipur',
        to: 'Delhi',
        depart: '2018-05-28',
        returnDate: '',
        passenger: 2,
        roundTrip: false
    };

    let maxPrice = 6000;

    let wrapper = shallow(<SearchResults
        departFlights={departFlights}
        returnFlights={returnFlights}
        searchQuery={searchQuery}
        maxPrice={maxPrice}
        store={store}
    />);

    expect(wrapper.find('.card')).to.have.length(7);

});

it('renders search-results page based on query from home page with round trip', () => {
    let departFlights = [
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'airasia',
            departTime: '09:00',
            arrivalTime: '10:00',
            price: '4000',
            seatsAvailable: '50'
        },
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'indigo',
            departTime: '10:00',
            arrivalTime: '12:00',
            price: '3000',
            seatsAvailable: '50'
        },
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'air india',
            departTime: '12:00',
            arrivalTime: '13:00',
            price: '2000',
            seatsAvailable: '50'
        },
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'air india',
            departTime: '14:00',
            arrivalTime: '15:00',
            price: '1000',
            seatsAvailable: '50'
        },
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'air india',
            departTime: '15:00',
            arrivalTime: '16:00',
            price: '1500',
            seatsAvailable: '50'
        },
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'spicejet',
            departTime: '15:00',
            arrivalTime: '16:00',
            price: '2500',
            seatsAvailable: '50'
        },
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'Go Air',
            departTime: '15:00',
            arrivalTime: '16:00',
            price: '6000',
            seatsAvailable: '50'
        }
    ];

    let returnFlights = [
        {
            from: 'New Delhi',
            to: 'Raipur',
            date: '2018-05-29',
            airlines: 'spicejet',
            departTime:'15:00',
            arrivalTime:'16:00',
            price: '2500',
            seatsAvailable: '50'
        },
        {
            from: 'New Delhi',
            to: 'Raipur',
            date: '2018-05-29',
            airlines: 'airasia',
            departTime:'12:00',
            arrivalTime:'13:00',
            price: '1500',
            seatsAvailable: '50'
        },
        {
            from: 'New Delhi',
            to: 'Raipur',
            date: '2018-05-29',
            airlines: 'spicejet',
            departTime:'11:00',
            arrivalTime:'12:00',
            price: '6500',
            seatsAvailable: '50'
        }
    ];
    let searchQuery = {
        from: 'Raipur',
        to: 'Delhi',
        depart: '2018-05-28',
        returnDate: '',
        passenger: 2,
        roundTrip: true
    };

    let maxPrice = 6500;

    let wrapper = shallow(<SearchResults
        departFlights={departFlights}
        returnFlights={returnFlights}
        searchQuery={searchQuery}
        maxPrice={maxPrice}
        store={store}
    />);

    expect(wrapper.find('.card')).to.have.length(10);

});

it('renders search-results page based on price change', () => {
    let departFlights = [
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'airasia',
            departTime: '09:00',
            arrivalTime: '10:00',
            price: '4000',
            seatsAvailable: '50'
        },
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'indigo',
            departTime: '10:00',
            arrivalTime: '12:00',
            price: '3000',
            seatsAvailable: '50'
        },
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'air india',
            departTime: '12:00',
            arrivalTime: '13:00',
            price: '2000',
            seatsAvailable: '50'
        },
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'air india',
            departTime: '14:00',
            arrivalTime: '15:00',
            price: '1000',
            seatsAvailable: '50'
        },
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'air india',
            departTime: '15:00',
            arrivalTime: '16:00',
            price: '1500',
            seatsAvailable: '50'
        },
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'spicejet',
            departTime: '15:00',
            arrivalTime: '16:00',
            price: '2500',
            seatsAvailable: '50'
        },
        {
            from: 'Raipur',
            to: 'New Delhi',
            date: '2018-05-28',
            airlines: 'Go Air',
            departTime: '15:00',
            arrivalTime: '16:00',
            price: '6000',
            seatsAvailable: '50'
        }
    ];

    let returnFlights = [];
    let searchQuery = {
        from: 'Raipur',
        to: 'Delhi',
        depart: '2018-05-28',
        returnDate: '',
        passenger: 2,
        roundTrip: false
    };

    let maxPrice = 6000;

    let wrapper = mount(<SearchResults
        departFlights={departFlights}
        returnFlights={returnFlights}
        searchQuery={searchQuery}
        maxPrice={maxPrice}
        store={store}
    />);

    let sideNavBarWrapper = (wrapper.find(SideNavBar));

    //7 flights are loaded with the above query
    expect(wrapper.find('.card')).to.have.length(7);

    //reduce the max price to 2000
    let event = {target: {value: 2000}};
    sideNavBarWrapper.find('.slider').simulate('change', event);

    //3 flights have price less than equal to 2000 hence we check for number of cards loaded
    expect(wrapper.find('.card')).to.have.length(3);

    //Again increase slider max price to 6000
    event = {target: {value: 6000}};
    sideNavBarWrapper.find('.slider').simulate('change', event);

    //expect 7 cards to be loaded as 7 flights are available under this price range
    expect(wrapper.find('.card')).to.have.length(7);

});
