import {connect} from 'react-redux';
import {searchFlights} from "../../redux/flights/flights-action";
import SearchResults from './search-results'

function mapStateToProps(state) {

    return {
        departFlights: state.flightsReducer.departFlights,
        returnFlights: state.flightsReducer.returnFlights,
        searchQuery: state.flightsReducer.searchQuery,
        maxPrice: Number(state.flightsReducer.maxPrice)
    }
}

function mapDispatchtoProps(dispatch) {
    return {
        searchFlights: (searchQuery) => {dispatch(searchFlights(searchQuery))}
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(SearchResults);
