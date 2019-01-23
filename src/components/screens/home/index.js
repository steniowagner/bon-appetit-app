// @flow

import React, { Component } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as HomeCreators } from '~/store/ducks/home';

import { persistItemInStorage } from '~/utils/AsyncStoarageManager';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

import { Alert, TYPES } from '~/components/common/alert';
import Loading from '~/components/common/Loading';

import YouMightLikeSection from './components/you-might-like/home-section';
import InYourCitySection from './components/in-your-city/home-section';
import PopularSection from './components/popular/home-section';

import Section from './components/Section';
import { ROUTE_NAMES } from './routes';

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

type HomeRequestResult = {
  youMightLikeDishes: Array<Object>,
  inYourCityEvents: Array<Object>,
  popularDishes: Array<Object>,
  userLocation: Object,
};

class Home extends Component<Props, State> {
  state = {
    isRefresing: false,
  };

  componentDidMount() {
    this.requestData();
  }

  async componentWillReceiveProps(nextProps) {
    const { homeRequest } = nextProps;
    const { userLocation } = homeRequest.data;

    if (
      typeof userLocation === 'object'
      && Object.keys(userLocation).length === 2
    ) {
      await persistItemInStorage(
        CONSTANTS.USER_LOCATION,
        JSON.stringify(userLocation),
      );
    }

    this.setState({
      isRefresing: false,
    });
  }

  requestData = (): void => {
    const { getHomeRequest } = this.props;

    getHomeRequest();
  };

  renderMainContent = (data: HomeRequestResult): Object => {
    const { isRefresing } = this.state;

    const { youMightLikeDishes, inYourCityEvents, popularDishes } = data;

    const hasYouMightLikeDishes = youMightLikeDishes && youMightLikeDishes.length > 0;
    const hasInYourCityEvents = inYourCityEvents && inYourCityEvents.length > 0;
    const hasPopularDishes = popularDishes && popularDishes.length > 0;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            progressBackgroundColor={appStyles.colors.primaryColor}
            tintColor={appStyles.colors.primaryColor}
            colors={[appStyles.colors.white]}
            onRefresh={this.requestData}
            refreshing={isRefresing}
          />
        }
      >
        {hasInYourCityEvents && (
          <Section
            nextRoute={ROUTE_NAMES.SEE_ALL_EVENTS}
            title="In Your City"
          >
            <InYourCitySection
              events={inYourCityEvents}
            />
          </Section>
        )}
        {hasYouMightLikeDishes && (
          <Section
            nextRoute={ROUTE_NAMES.YOU_MIGHT_LIKE_SEE_ALL}
            title="You Might Like"
          >
            <YouMightLikeSection
              dishes={youMightLikeDishes}
            />
          </Section>
        )}
        {hasPopularDishes && (
          <Section
            nextRoute={ROUTE_NAMES.POPULAR_SEE_ALL}
            title="Popular"
          >
            <PopularSection
              dishes={popularDishes}
            />
          </Section>
        )}
      </ScrollView>
    );
  };

  render() {
    const { homeRequest } = this.props;
    const { loading, error, data } = homeRequest;

    return (
      <Container>
        {loading && <Loading />}
        {error && <Alert
          type={TYPES.ERROR_SERVER_CONNECTION}
        />}
        {!loading && !error && this.renderMainContent(data)}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  homeRequest: state.home,
});

const mapDispatchToProps = dispatch => bindActionCreators(HomeCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
