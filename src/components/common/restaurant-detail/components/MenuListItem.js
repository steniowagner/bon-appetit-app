// @flow

import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  View,
} from 'react-native';

import { ROUTE_NAMES } from 'components/screens/home/routes';
import { withNavigation } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import FlagPrice from 'components/common/FlagPrice';

const Container = styled(View)`
  height: ${({ theme }) => theme.metrics.getHeightFromDP('15%')}px;
  margin-bottom: ${({ theme }) => `${theme.metrics.smallSize}px`}
`;

const ContentWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.metrics.smallSize}px;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  background-color: ${({ theme }) => theme.colors.defaultWhite};
`;

const DishImage = styled(FastImage).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
})`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('22%')}px;
  height: 100%;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const DishTitle = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  fontFamily: CircularStd-Black;
`;

const DishDescription = styled(Text).attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.5%')}px;
  fontFamily: CircularStd-Book;
`;

const FlagsContent = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('20%')}px;
  height: 100%;
  justify-content: space-between;
  align-items: flex-end;
`;

const FlagStars = styled(View)`
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.yellow};
`;

const TextContent = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  height: 100%;
  padding: ${({ theme }) => `0 0 ${theme.metrics.smallSize}px ${theme.metrics.smallSize}px`};
`;

const Stars = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  padding-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.2%')}px;
  fontFamily: CircularStd-Bold;
`;

const IconStar = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.defaultWhite,
  name: 'star',
  size: 12,
})`
  width: 12px;
  height: 12px;
`;

const FlagStarsContent = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
`;

type Props = {
  description: string,
  title: string,
  imageURL: string,
  id: string,
  reviews: number,
  price: number,
  stars: number,
  navigation: Function,
};

type State = {
  isFoodImageLoaded: boolean,
};

class MenuListItem extends Component<Props, State> {
  state = {
    isFoodImageLoaded: false,
  };

  onLoadFoodImage = () => {
    this.setState({
      isFoodImageLoaded: true,
    });
  }

  onPressItem = (): void => {
    const {
      description,
      navigation,
      title,
      imageURL,
      reviews,
      price,
      stars,
      id,
    } = this.props;

    const payload = {
      description,
      title,
      imageURL,
      reviews,
      price,
      stars,
      id,
    };

    navigation.navigate(ROUTE_NAMES.FOOD_DETAIL_REVIEW, { payload });
  };

  renderTextContent = (title: string, description: string): Object => (
    <TextContent>
      <DishTitle>
        {title}
      </DishTitle>
      <DishDescription>
        {description}
      </DishDescription>
    </TextContent>
  );

  renderFlagContent = (stars: number, price: number): Object => (
    <FlagsContent>
      <FlagStars>
        <FlagStarsContent>
          <IconStar />
          <Stars>
            {stars}
          </Stars>
        </FlagStarsContent>
      </FlagStars>
      <FlagPrice price={price} />
    </FlagsContent>
  );

  render() {
    const {
      description,
      title,
      imageURL,
      price,
      stars,
    } = this.props;

    const { isFoodImageLoaded } = this.state;

    return (
      <Container>
        <TouchableWithoutFeedback
          onPress={() => this.onPressItem()}
          disabled={!isFoodImageLoaded}
        >
          <ContentWrapper>
            <DishImage
              onLoad={() => this.onLoadFoodImage()}
              imageURL={imageURL}
            />
            {this.renderTextContent(title, description)}
            {this.renderFlagContent(stars, price)}
          </ContentWrapper>
        </TouchableWithoutFeedback>
      </Container>
    );
  }
}

export default withNavigation(MenuListItem);
