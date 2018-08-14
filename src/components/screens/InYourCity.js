import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import RestaurantItemList from 'components/common/restaurant-item-list';

const Container = styled(View)`
  flex: 1;
`;

const HeaderCotainer = styled(Animated.View)`
  justify-content: flex-end;
  width: 100%;
`;

const ContentWrapper = styled(View)`
  justify-content: flex-end;
  position: absolute;
  padding: ${({ theme }) => `0 ${theme.metrics.largePadding}px ${theme.metrics.largePadding}px ${theme.metrics.smallPadding}px`};
`;

const EventImage = styled(Image).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
})`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const EventTitle = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.titleTextSize}px;
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-family: CircularStd-Black;
`;

const EventDescription = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.descriptionTextSize}px;
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-family: CircularStd-Medium;
`;

const ArrowBackIcon = styled(Icon).attrs({
  name: ({ iconName }) => iconName,
  color: ({ theme }) => theme.colors.defaultWhite,
  size: 28,
})``;

const ArrowBackButtonWrapper = styled(TouchableOpacity)`
  position: absolute;
  margin-left: 4px;
  margin-top: ${({ theme }) => theme.metrics.extraLargePadding}px;
`;

const ListWrapper = styled(View)`
  flex: 1;
  padding-top: ${({ theme }) => theme.metrics.extraSmallPadding}px;
`;

const getTestData = () => {
  const data = [];

  for (let i = 0; i < 12; i++) {
    data.push({
      id: `${i}`,
      name: 'Cabaña del Primo',
      address: 'Maria Tomásia st., 503 - Aldeota, Fortaleza',
      foodTypes: ['Churrascaria', 'Sobremesas', 'Massas', 'Frutos do Mar', 'Pastelaria', 'Pizzas'],
      picURL: 'https://images.unsplash.com/photo-1533854964478-588049c5084e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9a3f43bf5f66dc44d7780904913a7fb3&auto=format&fit=crop&w=967&q=80',
      stars: 4.5,
    });
  }

  return data;
};

const MAX_HEADER_SCROLL_DISTANCE = 136;

type Props = {
  eventImageURL: string,
  eventTitle: string,
  eventDescription: string,
};

type State = {
  scrollOffset: Object,
}

class InYourCity extends Component<Props, State> {
  state = {
    scrollOffset: new Animated.Value(0),
  };

  renderArrowBack = () => (
    <ArrowBackButtonWrapper>
      <ArrowBackIcon iconName="arrow-left" />
    </ArrowBackButtonWrapper>
  );

  renderEventInfo = () => {
    const { eventTitle, eventDescription } = this.props;
    const { scrollOffset } = this.state;

    return (
      <ContentWrapper>
        <Animated.View
          style={{
            opacity: scrollOffset.interpolate({
              inputRange: [0, MAX_HEADER_SCROLL_DISTANCE / 5, MAX_HEADER_SCROLL_DISTANCE],
              outputRange: [1, 1, 0],
            }),
          }}
        >
          <EventTitle>
            {eventTitle}
          </EventTitle>
          <EventDescription>
            {eventDescription}
          </EventDescription>
        </Animated.View>
      </ContentWrapper>
    );
  }

  renderHeader = () => {
    const { eventImageURL } = this.props;
    const { scrollOffset } = this.state;

    return (
      <Animated.View style={{
        height: scrollOffset.interpolate({
          inputRange: [0, MAX_HEADER_SCROLL_DISTANCE],
          outputRange: [160, 72],
          extrapolate: 'clamp',
        }),
      }}
      >
        <HeaderCotainer>
          <EventImage imageURL={eventImageURL} />
          <DarkLayer />
          {this.renderEventInfo()}
        </HeaderCotainer>
      </Animated.View>
    );
  }

  renderRestaurantList = () => {
    const { scrollOffset } = this.state;

    return (
      <ListWrapper>
        <FlatList
          scrollEventThrottle={16}
          onScroll={Animated.event([{
            nativeEvent: {
              contentOffset: { y: scrollOffset },
            },
          }])}
          data={getTestData()}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <RestaurantItemList
              name={item.name}
              address={item.address}
              foodTypes={item.foodTypes}
              picURL={item.picURL}
              stars={item.stars}
            />
          )}
        />
      </ListWrapper>
    );
  }

  render() {
    return (
      <Container>
        <StatusBar translucent barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
        {this.renderHeader()}
        {this.renderArrowBack()}
        {this.renderRestaurantList()}
      </Container>
    );
  }
}

export default InYourCity;
