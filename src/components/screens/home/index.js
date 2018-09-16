// @flow

import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  StatusBar,
  Platform,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as HomeCreators } from 'store/ducks/home';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import appStyles from 'styles';

import { ROUTE_NAMES } from 'components/screens/home/routes';
import { persistItemInStorage } from 'components/utils/AsyncStoarageManager';

import Messages from 'components/utils/Messages';
import AppKeys from 'components/utils/Keys';

import Section from './components/Section';
import InYourCitySection from './components/in-your-city/iyc-home-section';
import YouMightLikeSection from './components/you-might-like/yml-home-section';
import Popular from './components/popular/popular-home-section';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const LoadingWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const AlerIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.green,
  name: 'alert-decagram',
  size: 120,
})`
  width: 120px;
  height: 120px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const EmptyBigText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('4.5%')}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  fontFamily: CircularStd-Black;
  text-align: center;
`;

const MediumText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('3.2%')}px;
  margin-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  fontFamily: CircularStd-Bold;
  text-align: center;
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
      fontSize: Platform.OS === 'ios' ? 26 : 30,
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

  renderEmpty = (): Object => (
    <EmptyWrapper>
      <AlerIcon />
      <EmptyBigText>
        I am empty :(
      </EmptyBigText>
      <MediumText>
        {'This is weird...\n\nSeems like that we don\'t have nothing to offer you today.\n\nSorry for that.'}
      </MediumText>
    </EmptyWrapper>
  )

  renderContent = (): Object => {
    const {
      userLocation,
      inYourCityEvents,
      youMightLikeDishes,
      popularDishes,
    } = this.getRequestResponseData();

    const { isRefresing } = this.state;

    if (userLocation) {
      this.persistUserLocation(userLocation);
    }

    const hasInYourCityEvents = inYourCityEvents && inYourCityEvents.length > 0;
    const hasYouMightLikeDishes = youMightLikeDishes && youMightLikeDishes.length > 0;
    const hasPopularDishes = popularDishes && popularDishes.length > 0;

    const isEmpty = !hasInYourCityEvents && !hasYouMightLikeDishes && !hasPopularDishes;

    const HomeContent = (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={(
          <RefreshControl
            refreshing={isRefresing}
            onRefresh={() => this.requestData()}
            tintColor={appStyles.colors.green}
            progressBackgroundColor={appStyles.colors.green}
            colors={[appStyles.colors.white]}
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

    return (
      isEmpty ? this.renderEmpty() : HomeContent
    );
  }

  renderLoading = (): Object => (
    <LoadingWrapper>
      <ActivityIndicator
        size={Platform.OS === 'ios' ? 'small' : 'large'}
        color={appStyles.colors.green}
      />
    </LoadingWrapper>
  )

  renderMainContent = (isLoading: boolean): Object => (isLoading ? this.renderLoading() : this.renderContent());

  render() {
    const { homeRequest } = this.props;
    const { loading, error } = homeRequest;

    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
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
