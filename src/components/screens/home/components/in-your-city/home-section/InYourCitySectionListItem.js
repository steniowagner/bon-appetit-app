// @flow

import React, { Component, Fragment } from 'react';
import {
  TouchableWithoutFeedback, Image, Text, View,
} from 'react-native';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { withNavigation } from 'react-navigation';

import styled from 'styled-components';

import { ROUTE_NAMES } from '~/components/screens/home/routes';
import CONSTANTS from '~/utils/CONSTANTS';

const Container = styled(View)`
  height: ${({ theme }) => theme.metrics.getHeightFromDP('20%')}px;
  width: ${({ theme }) => theme.metrics.getWidthFromDP('70%')}px;
  margin-left: ${({ theme, isFirst }) => (isFirst ? theme.metrics.largeSize : 0)}px;
  margin-right: ${({ theme }) => theme.metrics.smallSize}
  border-radius: ${({ theme }) => theme.metrics.borderRadius};
`;

const ImageShimmerOverlay = styled(ShimmerPlaceHolder).attrs({
  visible: false,
  autoRun: true,
})`
  height: 100%;
  width: 100%;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.borderRadius};
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

const EventImage = styled(Image).attrs(({ imageURL }) => ({
  source: { uri: imageURL },
}))`
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
  navigation: Function,
  description: string,
  imageURL: string,
  isFirst: boolean,
  title: string,
  id: string,
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
  };

  render() {
    const {
      description,
      imageURL,
      title,
      isFirst,
      navigation,
      id,
    } = this.props;

    const { isImageLoaded } = this.state;

    return (
      <Fragment>
        <Container
          isFirst={isFirst}
        >
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(ROUTE_NAMES.EVENT_DETAILS, {
              [CONSTANTS.NAVIGATION_PARAM_ID]: id,
            })
            }
            disabled={!isImageLoaded}
          >
            <View>
              <EventImage
                imageURL={imageURL}
                onLoad={() => this.onLoadImage()}
              />
              <DarkLayer />
              <AboutEventWrapper>
                <EventTitle>{title}</EventTitle>
                <EventDescription>{description}</EventDescription>
              </AboutEventWrapper>
            </View>
          </TouchableWithoutFeedback>
          {!isImageLoaded && <ImageShimmerOverlay />}
        </Container>
      </Fragment>
    );
  }
}

export default withNavigation(InYourCityListItem);
