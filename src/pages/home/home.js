import React from 'react';
import PropTypes from 'prop-types';
import './home.css';
import Autocomplete from 'react-autocomplete';
import {validateForm, getDisplayAirports} from "../../util/util";
import {airports} from "../../util/db-util";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: '',
            to: '',
            depart: '',
            returnDate: '',
            passenger: '',
            roundTrip: false,
            valid: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
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
            this.props.history.push('/search');
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
                value = value.substring(value.lastIndexOf(' '),0);
                this.setState({[e.target.name]: value})
            }}
            onSelect={(val) => {
                val = val.substring(val.lastIndexOf(' '),0);
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
        return (
            <div className="jumbotron">
                <h1 className="heading">Air Works</h1>
                <div className="home-content">
                    {!this.state.valid && <p>Please enter details correctly</p>}
                    <div className="row">
                        <div className="col-12 col-s-12">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-6 col-s-6 form-group">
                                        <span>From</span>
                                        {this.getInput('from', this.state.from)}
                                    </div>
                                    <div className="col-6 col-s-6 form-group">
                                        <span>To</span>
                                        {this.getInput('to', this.state.to)}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 col-s-6 form-group">
                                        <span>Depart</span>
                                        {this.getDateInput('depart', this.state.depart)}
                                    </div>
                                    <div className="col-6 col-s-6 form-group">
                                        <span>Return</span>
                                        {this.getDateInput('returnDate', this.state.returnDate)}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 col-s-6 form-group">
                                        <span>Passenger</span>
                                        <div>
                                            <input type="number" name="passenger" onChange={(e) => {
                                                this.setState({passenger: e.target.value})
                                            }}/>
                                        </div>
                                    </div>
                                    <div className="col-6 col-s-6 form-group">
                                        <div className="twoway-conatiner">
                                            <p>Two Way</p>
                                            <div className="checkboxOne">
                                                <input type="checkbox" value="1" id="checkboxOneInput"
                                                       onChange={(e) => {
                                                           this.setState({roundTrip: e.target.checked})
                                                       }}
                                                />
                                                <label htmlFor="checkboxOneInput"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-s-3 col-3" style={{display: 'flex', float: 'right'}}>
                                        <div className="button-container">
                                            <input className="button-submit" value="Search Flights" type="submit"/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    searchFlights: PropTypes.func
}