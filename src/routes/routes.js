import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from '../pages/home/home-container';
import SearchResults from "../pages/search-results/search-results-container";

export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/search" component={SearchResults}/>
            </Switch>
        );
    }
}