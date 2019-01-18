// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as SearchRestaurantsCreators } from '~/store/ducks/search-restaurants';

import SearchRestaurants from './components';
import { getItemFromStorage } from '~/utils/AsyncStoarageManager';
import CONSTANTS from '~/utils/CONSTANTS';

type Props = {
  requestSearchRestaurants: Function,
  searchRestaurants: Object,
};

type State = {
  userLocation: Array<any>,
};

class SearchRestaurantsContainer extends Component<Props, State> {
  state = {
    userLocation: [],
  };

  async componentDidMount() {
    const persistedUserLocation = await getItemFromStorage(
      CONSTANTS.USER_LOCATION,
      [0, 0],
    );

    const userLocation = typeof persistedUserLocation === 'string'
      ? JSON.parse(persistedUserLocation)
      : persistedUserLocation;

    this.setState({
      userLocation,
    });
  }

  onSearchRestaurants = (
    dishesTypes: Array<string>,
    maxDistance: number,
  ): void => {
    const { requestSearchRestaurants } = this.props;
    const { userLocation } = this.state;

    requestSearchRestaurants(dishesTypes, maxDistance, userLocation);
  };

  render() {
    const { searchRestaurants } = this.props;

    return (
      <SearchRestaurants
        onSearchRestaurants={this.onSearchRestaurants}
        {...searchRestaurants}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(SearchRestaurantsCreators, dispatch);

const mapStateToProps = state => ({
  searchRestaurants: state.searchRestaurants,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchRestaurantsContainer);
