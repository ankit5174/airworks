import {connect} from 'react-redux';
import {searchFlights} from "../../redux/flights/flights-action";
import Home from "./home";

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchtoProps(dispatch) {
    return {
        searchFlights: (searchQuery) => {dispatch(searchFlights(searchQuery))}
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Home);
