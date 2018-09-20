// @flow

import React, { Component, Fragment } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  FlatList,
  Platform,
  Text,
  View,
} from 'react-native';

import { Creators as EventCreators } from 'store/ducks/events';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';
import appStyles from 'styles';

import RestaurantItemList from 'components/common/RestaurantItemList';
import Messages from 'components/utils/Messages';

const getTextSize = (type: string): number => {
  const types = {
    restaurantsParticipating: Platform.OS === 'android' ? '2.6%' : '2.2%',
    description: Platform.OS === 'android' ? '2.8%' : '2.4%',
    title: Platform.OS === 'android' ? '3.8%' : '3.5%',
  };

  return appStyles.metrics.getHeightFromDP(types[type]);
};

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ListWrapper = styled(View)`
  flex: 1;
  padding: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const LoadingWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const HeaderCotainer = styled(View)`
  width: 100%;
  height: ${({ theme }) => {
    const percentage = Platform.OS === 'android' ? '33%' : '30%';
    return theme.metrics.getHeightFromDP(percentage);
  }}px;
  justify-content: flex-end;
`;

const HeaderCotainerShimmer = styled(ShimmerPlaceholder).attrs({
  autoRun: true,
  visible: false,
})`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('33%')}px;
`;

const DarkWrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.darkLayer}
`;

const EventImage = styled(FastImage).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const EventTitle = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${() => getTextSize('title')}px;
  font-family: CircularStd-Black;
`;

const EventDescription = styled(Text).attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${() => getTextSize('description')}px;
  font-family: CircularStd-Medium;
`;

const RestaurantParticipatingText = styled(Text)`
  font-size: ${() => getTextSize('restaurantsParticipating')}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.defaultWhite};
`;

type Props = {
  getRestaurantsRequest: Function,
  navigation: Function,
  eventInfo: Object,
};

type State = {
  isEventImageLoaded: boolean,
};

class EventInfo extends Component<Props, State> {
  static navigationOptions = {
    headerTintColor: appStyles.colors.defaultWhite,
    headerTransparent: true,
    headerBackTitle: null,
  };

  state = {
    isEventImageLoaded: false,
  };

  componentDidMount() {
    const { getRestaurantsRequest } = this.props;

    const { restaurantsParticipating, dishesTypes } = this.getNavigationParams();

    getRestaurantsRequest(dishesTypes, restaurantsParticipating);
  }

  onLoadEventImage = (): void => {
    this.setState({
      isEventImageLoaded: true,
    });
  }

  getNavigationParams = (): Object => {
    const { navigation } = this.props;
    const payload = navigation.getParam('payload', '');

    return {
      ...payload,
    };
  }

  renderLoading = (): Object => (
    <LoadingWrapper>
      <ActivityIndicator
        size={Platform.OS === 'ios' ? 'small' : 'large'}
        color={appStyles.colors.green}
      />
    </LoadingWrapper>
  )

  renderEventInfo = (): Object => {
    const {
      restaurantsParticipating,
      description,
      imageURL,
      title,
    } = this.getNavigationParams();

    const { isEventImageLoaded } = this.state;

    return (
      <HeaderCotainer>
        <EventImage
          onLoad={() => this.onLoadEventImage()}
          imageURL={imageURL}
        />
        <DarkWrapper>
          <EventTitle>
            {title}
          </EventTitle>
          <EventDescription>
            {description}
          </EventDescription>
          <RestaurantParticipatingText>
            {`${restaurantsParticipating} Restaurants participating`}
          </RestaurantParticipatingText>
        </DarkWrapper>
        {!isEventImageLoaded && <HeaderCotainerShimmer />}
      </HeaderCotainer>
    );
  }

  renderRestaurantList = (restaurantsList: Array<any>): Object => (
    <ListWrapper>
      <FlatList
        data={restaurantsList}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <RestaurantItemList
            foodTypes={item.foodTypes}
            imageURL={item.imageURL}
            address={item.address}
            stars={item.stars}
            name={item.name}
            id={item.id}
          />
        )}
      />
    </ListWrapper>
  );

  renderMainContent = (): Object => {
    const { eventInfo } = this.props;
    const { restaurants, loadingRestaurants } = eventInfo;

    return (
      <Fragment>
        {this.renderEventInfo()}
        {loadingRestaurants ? this.renderLoading() : this.renderRestaurantList(restaurants)}
      </Fragment>
    );
  }

  render() {
    const { eventInfo } = this.props;
    const { error } = eventInfo;

    return (
      <Container>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          animated
          translucent
        />
        {error ? alert(Messages.ERROR_MESSAGE) : this.renderMainContent()}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(EventCreators, dispatch);

const mapStateToProps = state => ({
  eventInfo: state.events,
});

export default connect(mapStateToProps, mapDispatchToProps)(EventInfo);
