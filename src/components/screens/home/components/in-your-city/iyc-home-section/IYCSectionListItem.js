// @flow

import React, { Component, Fragment } from 'react';
import {
  TouchableWithoutFeedback,
  Image,
  Text,
  View,
} from 'react-native';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import styled from 'styled-components';

import { withNavigation } from 'react-navigation';
import { ROUTE_NAMES } from 'components/screens/home/routes';

const Container = styled(View)`
  height: ${({ theme }) => (theme.metrics.getHeightFromDP('20%'))}px;
  width: ${({ theme }) => (theme.metrics.getWidthFromDP('70%'))}px;
  margin-left: ${({ theme, index }) => (index === 0 ? theme.metrics.largeSize : 0)}px;
  margin-right: ${({ theme }) => theme.metrics.smallSize}
  border-radius: ${({ theme }) => theme.metrics.borderRadius};
`;

const Wrapper = styled(View)``;

const ContainerShimmer = styled(ShimmerPlaceHolder)`
  height: ${({ theme }) => (theme.metrics.getHeightFromDP('20%'))}px;
  width: ${({ theme }) => (theme.metrics.getWidthFromDP('70%'))}px;
  margin-left: ${({ theme, index }) => (index === 0 ? theme.metrics.largeSize : 0)}px;
  margin-right: ${({ theme }) => theme.metrics.smallSize}
  border-radius: ${({ theme }) => theme.metrics.borderRadius};
  position: absolute;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.darkLayer};
  border-radius: ${({ theme }) => theme.metrics.borderRadius};
`;

const EventTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.5%')};
  padding-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('1%')};
  font-family: CircularStd-Black;
`;

const EventDescription = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
  font-family: CircularStd-Medium;
  text-align: center;
`;

const EventImage = styled(Image).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
})`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.borderRadius};
`;

const AboutEventWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  padding: ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
`;

type Props = {
  description: string,
  imageURL: string,
  title: string,
  id: string,
  restaurantsParticipating: number,
  index: number,
  dishesTypes: Array<string>,
  navigation: Function,
};

type State = {
  isImageLoaded: boolean,
};

class InYourCityListItem extends Component<Props, State> {
  state = {
    isImageLoaded: false,
  };

  onLoadImage = (): void => {
    this.setState({
      isImageLoaded: true,
    });
  }

  onPressItem = (): void => {
    const {
      restaurantsParticipating,
      dishesTypes,
      description,
      navigation,
      imageURL,
      title,
      id,
    } = this.props;

    const payload = {
      restaurantsParticipating,
      dishesTypes,
      description,
      navigation,
      imageURL,
      title,
      id,
    };

    navigation.navigate(ROUTE_NAMES.EVENT_DETAILS, { payload });
  };

  render() {
    const {
      description,
      imageURL,
      title,
      index,
    } = this.props;

    const { isImageLoaded } = this.state;

    return (
      <Fragment>
        <Container index={index}>
          <TouchableWithoutFeedback
            disabled={!isImageLoaded}
            onPress={() => this.onPressItem()}
          >
            <Wrapper>
              <EventImage
                imageURL={imageURL}
                onLoad={() => this.onLoadImage()}
              />
              <DarkLayer />
              <AboutEventWrapper>
                <EventTitle>
                  {title}
                </EventTitle>
                <EventDescription>
                  {description}
                </EventDescription>
              </AboutEventWrapper>
            </Wrapper>
          </TouchableWithoutFeedback>
        </Container>
        <ContainerShimmer
          autoRun
          index={index}
          visible={isImageLoaded}
        />
      </Fragment>
    );
  }
}

export default withNavigation(InYourCityListItem);
