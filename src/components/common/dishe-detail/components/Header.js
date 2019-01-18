// @flow

import React, { Component, Fragment } from 'react';
import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

import ProgressiveImage from '~/components/common/ProgressiveImage';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

import SeeRestaurantButton from './SeeRestaurantButton';

const ImageWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('27%')};
`;

const SeeRestaurantButtonWrapper = styled(View)`
  height: ${({ theme }) => theme.metrics.getHeightFromDP('27%')};
  position: absolute;
  align-self: flex-end;
  justify-content: flex-end;
`;

const SmokeShadow = styled(LinearGradient).attrs({
  colors: ['transparent', appStyles.colors.dark, appStyles.colors.dark],
})`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('28%')};
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('12%')};
`;

const DishImageWrapper = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
`;

type Props = {
  thumbnailImageURL: string,
  restaurantId: string,
  navigation: Object,
  imageURL: string,
};

type State = {
  isImageLoaded: boolean,
};

class Header extends Component<Props, State> {
  state = {
    isImageLoaded: false,
  };

  onLoadImage = (): void => {
    const { isImageLoaded } = this.state;

    this.setState({
      isImageLoaded: !isImageLoaded,
    });
  };

  render() {
    const {
      thumbnailImageURL,
      restaurantId,
      navigation,
      imageURL,
    } = this.props;

    const isDishDetailInReviewMode = navigation.getParam(
      CONSTANTS.NAVIGATION_PARAM_IS_DISH_DETAIL_REVIEW_MODE,
      false,
    );

    return (
      <Fragment>
        <ImageWrapper>
          <DishImageWrapper>
            <ProgressiveImage
              thumbnailImageURL={thumbnailImageURL}
              imageURL={imageURL}
            />
          </DishImageWrapper>
          <SmokeShadow />
        </ImageWrapper>
        {isDishDetailInReviewMode && (
          <SeeRestaurantButtonWrapper>
            <SeeRestaurantButton
              restaurantId={restaurantId}
            />
          </SeeRestaurantButtonWrapper>
        )}
      </Fragment>
    );
  }
}

export default Header;
