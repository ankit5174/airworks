import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './side-nav-bar.css';
import Autocomplete from 'react-autocomplete';
import {getDisplayAirports, validateForm} from "../../util/util";
import {airports} from "../../util/db-util";


export default class SideNavBar extends Component {

    constructor(props) {
        super(props);
        let {searchQuery} = this.props;
        this.state = {
            from: searchQuery.from,
            to: searchQuery.to,
            depart: searchQuery.depart,
            returnDate: searchQuery.returnDate,
            passenger: searchQuery.passenger,
            roundTrip: searchQuery.roundTrip,
            valid: true
        };

        this.toggleSideNavBar = this.toggleSideNavBar.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleSideNavBar() {
        this.props.toggleSideNavBar();
    }

    handleSubmit(events) {
        events.preventDefault();
        let valid = validateForm(events.target, this.state.roundTrip);
        if (valid) {
            let target = events.target;
            let searchQuery = {
                from: target.from.value,
                to: target.to.value,
                depart: target.depart.value,
                returnDate: target.returnDate.value,
                passenger: target.passenger.value,
                roundTrip: this.state.roundTrip
            };
            this.props.searchFlights(searchQuery);
        } else {
            this.setState({valid: false});
        }
    }

    getInput(name, value) {

        return <Autocomplete
            style={{width: '100%'}}
            getItemValue={(item) => item.label}
            items={getDisplayAirports(airports)}
            inputProps={{name: name}}
            renderItem={(item, isHighlighted) =>
                <div style={{
                    background: isHighlighted ? 'lightgray' : 'white',
                    color: 'black',
                    height: '40px',
                    padding: '10px'
                }}>
                    {item.label}
                </div>
            }
            value={value}
            onChange={(e) => {
                let value = e.target.value;
                value = value.substring(value.lastIndexOf(' '), 0);
                this.setState({[e.target.name]: value})
            }}
            onSelect={(val) => {
                val = val.substring(val.lastIndexOf(' '), 0);
                this.setState({[name]: val})
            }}
        />
    }

    getDateInput(name, value) {
        let disabled;
        if (name === 'returnDate' && !this.state.roundTrip) {
            disabled = 'disabled';
        }
        return (<div><input disabled={disabled} name={name} value={value} onChange={(e) => {
            this.setState({[name]: e.target.value})
        }} type="date"/></div>)
    }

    render() {
        let {sideNavBarOpen, maxPrice, sliderMaxPrice, updateSliderMaxPrice} = this.props;
        let sidebarClass = sideNavBarOpen ? 'sidebar' : 'sidebar active';

        return (
            <nav className={sidebarClass}>
                <a onClick={this.toggleSideNavBar} className="sidebar-toggle-button">{sideNavBarOpen ?
                    <i className="fa fa-hand-point-left"/> : <i className="fa fa-hand-point-right"/>}</a>
                <form onSubmit={this.handleSubmit}>
                    <ul className="components">
                        <span>From</span>
                        <li>{this.getInput('from', this.state.from)}</li>
                        <span>To</span>
                        <li>{this.getInput('to', this.state.to)}</li>
                        <span>Depart</span>
                        <li>{this.getDateInput('depart', this.state.depart)}</li>
                        <span>Return</span>
                        <li>{this.getDateInput('returnDate', this.state.returnDate)}</li>
                        <span>Passenger</span>
                        <li>
                            <div>
                                <input type="number" name="passenger"
                                       value={this.state.passenger}
                                       onChange={(e) => {
                                           this.setState({passenger: e.target.value})
                                       }}/>
                            </div>
                        </li>

                        <div className="twoway-conatiner">
                            <p>Two Way</p>
                            <div className="checkboxOne">
                                <input type="checkbox" value="1" id="checkboxOneInput"
                                       checked={this.state.roundTrip}
                                       onChange={(e) => {
                                           this.setState({roundTrip: e.target.checked})
                                       }}
                                />
                                <label htmlFor="checkboxOneInput"/>
                            </div>
                        </div>

                        <div className="slidecontainer">
                            <p>Price</p>
                            <input ref="priceSlider" type="range" min="1" max={maxPrice} className="slider" id="myRange"
                                   onChange={(e)=>{updateSliderMaxPrice(e.target.value)}}
                                   value={sliderMaxPrice}
                            />
                        </div>
                        <p>{sliderMaxPrice}</p>

                        <div className="button-container">
                            <input className="button-submit" value="Search Flights" type="submit"/>
                        </div>

                    </ul>


                </form>
            </nav>
        );
    }
}

SideNavBar.propTypes = {
    sideNavBarOpen: PropTypes.bool,
    toggleSideNavBar: PropTypes.func,
    searchFlights: PropTypes.func,
    maxPrice: PropTypes.number,
    sliderMaxPrice: PropTypes.number,
    updateSliderMaxPrice: PropTypes.func
};

