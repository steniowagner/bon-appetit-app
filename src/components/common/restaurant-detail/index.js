// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as RestaurantCreators } from '~/store/ducks/restaurant';

import { getItemFromStorage } from '~/utils/AsyncStoarageManager';
import { handleHiddenHeaderStyle } from '~/routes/headerUtils';
import CONSTANTS from '~/utils/CONSTANTS';

import RestaurantDetail from './RestaurantDetail';

type Props = {
  requestRestaurantDetailRequest: Function,
  resetState: Function,
  restaurant: Object,
  navigation: Object,
};

type State = {
  userLocation: Object,
};

class RestaurantDetailContainer extends Component<Props, State> {
  state = {
    userLocation: { ...CONSTANTS.FORTALEZA_CITY_LOCATION },
  };

  async componentDidMount() {
    await this.handleRecoverUserLocationFromStorage();
    await this.handleFetchRestaurantDetail();
  }

  componentWillReceiveProps(nextProps: Props) {
    const { loading, error } = nextProps.restaurant;
    const { navigation } = this.props;

    handleHiddenHeaderStyle(navigation, loading, error);
  }

  componentWillUnmount() {
    const { resetState } = this.props;

    resetState();
  }

  handleRecoverUserLocationFromStorage = async (): any => {
    const persistedUserLocation = await getItemFromStorage(
      CONSTANTS.USER_LOCATION,
      CONSTANTS.FORTALEZA_CITY_LOCATION,
    );

    const userLocation = typeof persistedUserLocation === 'string'
      ? JSON.parse(persistedUserLocation)
      : persistedUserLocation;

    this.setState({
      userLocation,
    });
  };

  handleFetchRestaurantDetail = async (): any => {
    const { requestRestaurantDetailRequest, navigation } = this.props;
    const { userLocation } = this.state;

    const id = navigation.getParam(CONSTANTS.NAVIGATION_PARAM_ID, '');

    requestRestaurantDetailRequest(userLocation, id);
  };

  render() {
    const { userLocation } = this.state;
    const { restaurant } = this.props;

    return <RestaurantDetail
      userLocation={userLocation}
      {...restaurant}
    />;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(RestaurantCreators, dispatch);

const mapStateToProps = state => ({
  restaurant: state.restaurant,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantDetailContainer);
