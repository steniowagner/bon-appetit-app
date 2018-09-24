// @flow

import React, { Component, Fragment } from 'react';
import {
  RefreshControl,
  ScrollView,
  Platform,
  View,
} from 'react-native';

import { Creators as HomeCreators } from 'store/ducks/home';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styled from 'styled-components';
import appStyles from 'styles';

import { persistItemInStorage } from 'components/utils/AsyncStoarageManager';
import { ROUTE_NAMES } from 'components/screens/home/routes';

import ItemNotFound from 'components/common/ItemNotFound';
import Messages from 'components/utils/Messages';
import Loading from 'components/common/Loading';
import AppKeys from 'components/utils/Keys';

import YouMightLikeSection from './components/you-might-like/yml-home-section';
import InYourCitySection from './components/in-your-city/iyc-home-section';
import Popular from './components/popular/popular-home-section';
import Section from './components/Section';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  getHomeRequest: Function,
  homeRequest: Object,
};

type State = {
  isRefresing: boolean,
};

class HomeMainContent extends Component<Props, State> {
  static navigationOptions = {
    title: 'Bon Appetit',
    headerStyle: {
      backgroundColor: appStyles.colors.primaryColor,
      borderBottomWidth: 0,
    },
    headerTintColor: appStyles.colors.defaultWhite,
    headerTitleStyle: {
      color: appStyles.colors.defaultWhite,
      fontFamily: 'Modesta-Script',
      fontWeight: '200',
      fontSize: (Platform.OS === 'ios'
        ? appStyles.metrics.getHeightFromDP('4.5%')
        : appStyles.metrics.getHeightFromDP('6%')),
    },
  };

  state = {
    isRefresing: false,
  };

  componentDidMount() {
    this.requestData();
  }

  componentWillReceiveProps() {
    this.setState({
      isRefresing: false,
    });
  }

  getRequestResponseData = (): Array<Object> => {
    const { homeRequest } = this.props;
    const { data, loading, error } = homeRequest;

    if (loading || error) {
      return {
        userLocation: {
          latitude: 0,
          longitude: 0,
        },
        inYourCityEvents: [],
        youMightLikeDishes: [],
        popularDishes: [],
      };
    }

    return {
      ...data,
    };
  }

  requestData = (): void => {
    const { getHomeRequest } = this.props;

    getHomeRequest();
  }

  persistUserLocation = async (userLocation): void => {
    await persistItemInStorage(AppKeys.USER_LOCATION, JSON.stringify(userLocation));
  }

  renderContent = (): Object => {
    const {
      youMightLikeDishes,
      inYourCityEvents,
      popularDishes,
      userLocation,
    } = this.getRequestResponseData();

    const { isRefresing } = this.state;

    if (userLocation) {
      this.persistUserLocation(userLocation);
    }

    const hasYouMightLikeDishes = youMightLikeDishes && youMightLikeDishes.length > 0;
    const hasInYourCityEvents = inYourCityEvents && inYourCityEvents.length > 0;
    const hasPopularDishes = popularDishes && popularDishes.length > 0;

    const isEmpty = !false && !hasYouMightLikeDishes && !hasPopularDishes;

    const HomeContent = (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={(
          <RefreshControl
            progressBackgroundColor={appStyles.colors.green}
            onRefresh={() => this.requestData()}
            tintColor={appStyles.colors.green}
            colors={[appStyles.colors.white]}
            refreshing={isRefresing}
          />
        )}
      >
        {hasInYourCityEvents && (
          <Section
            title="In Your City"
            nextRoute={ROUTE_NAMES.ALL_EVENTS}
            render={() => (
              <InYourCitySection
                events={inYourCityEvents}
              />
            )}
          />
        )}
        {hasYouMightLikeDishes && (
          <Section
            title="You Might Like"
            nextRoute={ROUTE_NAMES.ALL_YOU_MIGHT_LIKE}
            render={() => (
              <YouMightLikeSection
                dishes={youMightLikeDishes}
              />
            )}
          />
        )}
        {hasPopularDishes && (
          <Section
            title="Popular"
            nextRoute={ROUTE_NAMES.ALL_POPULAR}
            render={() => (
              <Popular
                dishes={popularDishes}
              />
            )}
          />
        )}
      </ScrollView>
    );

    const HomeEmpty = (
      <ItemNotFound
        description={'This is weird...\n\nSeems like that we don\'t have nothing to offer you today.'}
        iconName="alert-decagram"
        funnyText="I am empty :("
        tipText="Sorry for that."
      />
    );

    return (
      isEmpty ? HomeEmpty : HomeContent
    );
  }

  renderMainContent = (isLoading: boolean): Object => (isLoading ? <Loading /> : this.renderContent());

  render() {
    const { homeRequest } = this.props;
    const { loading, error } = homeRequest;

    return (
      <Fragment>
        <Container>
          {error ? alert(Messages.ERROR_MESSAGE) : this.renderMainContent(loading)}
        </Container>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(HomeCreators, dispatch);

const mapStateToProps = state => ({
  homeRequest: state.home,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeMainContent);
