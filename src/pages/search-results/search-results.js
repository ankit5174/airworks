import React from 'react';
import PropTypes from 'prop-types';
import SideNavBar from '../../components/side-nav-bar/side-nav-bar';
import './search-results.css';
import {getAirlineLogo, getAirportCode} from "../../util/util";

export default class SearchResults extends React.Component {

    constructor(props) {
        super(props);
        let {maxPrice} = this.props;
        this.state = {
            sideNavBarOpen: true,
            sliderMaxPrice: maxPrice
        };
        this.toggleSideNavBar = this.toggleSideNavBar.bind(this);
        this.updateSliderMaxPrice = this.updateSliderMaxPrice.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let {maxPrice} = nextProps;
        this.setState({sliderMaxPrice: maxPrice})
    }

    toggleSideNavBar() {
        this.setState((prevState, props) => ({
            sideNavBarOpen: !prevState.sideNavBarOpen
        }));
    }

    updateSliderMaxPrice(sliderVal) {
        this.setState({sliderMaxPrice: Number(sliderVal)})
    }

    getSearchCard(index, airlines, departure, from, to, arrival, price) {
        return (
            <div key={index} className="card">
                <div className="col-3 col-s-3 logo">
                    <img src={getAirlineLogo(airlines)}/>
                </div>
                <div className="col-3 col-s-3">
                    <div>
                        <span>{departure}</span>
                        <span>{getAirportCode(from)}</span>
                    </div>
                </div>
                <div className="col-3 col-s-3">
                    <div>
                        <span>{arrival}</span>
                        <span>{getAirportCode(to)}</span>
                    </div>
                </div>
                <div className="col-3 col-s-3">
                    <div>
                        <span>{price}</span>
                        <a className="p-t-5">Book</a>
                    </div>
                </div>
            </div>
        )
    }

    render() {

        let {departFlights, returnFlights, searchQuery, searchFlights, maxPrice} = this.props;

        let sectionClasses = searchQuery.roundTrip?"flight-section col-6 col-s-6": "";

        return (
            <div className="wrapper">
                <SideNavBar sliderMaxPrice={this.state.sliderMaxPrice}
                            maxPrice={maxPrice}
                            searchQuery={searchQuery}
                            searchFlights={searchFlights}
                            sideNavBarOpen={this.state.sideNavBarOpen}
                            toggleSideNavBar={this.toggleSideNavBar}
                            updateSliderMaxPrice={this.updateSliderMaxPrice}
                />
                <div className="content">
                    <div className="search-results">

                        <div className={sectionClasses}>
                            <div className="flight-section-header"><h3>Onward</h3></div>
                            <div className="header">
                                <div className="col-3 col-s-3 logo">
                                    <span>Airlines</span>
                                </div>
                                <div className="col-3 col-s-3">
                                    <span className="db">Departure</span>
                                </div>
                                <div className="col-3 col-s-3">
                                    <span className="db">Arrival</span>
                                </div>
                                <div className="col-3 col-s-3">
                                    <span>Price</span>
                                </div>
                            </div>

                            {departFlights.map((flight, index) => {
                                return flight.price <= this.state.sliderMaxPrice && this.getSearchCard(index, flight.airlines, flight.departTime, flight.from, flight.to, flight.arrivalTime, flight.price);
                            })}
                        </div>

                        {searchQuery.roundTrip
                        &&
                        <div className="flight-section col-6 col-s-6">
                            <div className="flight-section-header"><h3>Return</h3></div>
                            <div className="header">
                                <div className="col-3 col-s-3 logo">
                                    <span>Airlines</span>
                                </div>
                                <div className="col-3 col-s-3">
                                    <span className="db">Departure</span>
                                </div>
                                <div className="col-3 col-s-3">
                                    <span className="db">Arrival</span>
                                </div>
                                <div className="col-3 col-s-3">
                                    <span>Price</span>
                                </div>
                            </div>

                            {returnFlights.map((flight, index) => {
                                return flight.price <= this.state.sliderMaxPrice && this.getSearchCard(index, flight.airlines, flight.departTime, flight.from, flight.to, flight.arrivalTime, flight.price);
                            })}
                        </div>
                        }


                    </div>
                </div>

            </div>
        )
    }
}

SearchResults.propsTypes = {
    departFlights: PropTypes.array,
    returnFlights: PropTypes.array,
    searchFlights: PropTypes.func,
    searchQuery: PropTypes.object,
    maxPrice: PropTypes.number
};
