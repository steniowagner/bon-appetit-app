// @flow

import React from 'react';
import {
  TouchableWithoutFeedback, Platform, Text, View,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components';

import { ROUTE_NAMES } from '~/components/screens/home/routes';

import ReviewStars from '~/components/common/ReviewStars';
import FlagPrice from '~/components/common/FlagPrice';

import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const getTextSize = (type: string): number => {
  const sizes = {
    title: Platform.OS === 'android' ? '5%' : '4.5%',
    default: Platform.OS === 'android' ? '4%' : '3.5%',
  };

  return appStyles.metrics.getWidthFromDP(sizes[type]);
};

const Container = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('18%')}px;
  flex-direction: row;
  justify-content: center;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const DishImageWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getHeightFromDP('18%')}px;
  height: 100%;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  overflow: hidden;
`;

const DishImage = styled(FastImage).attrs(({ imageURL }) => ({
  source: { uri: imageURL },
  resizeMode: 'cover',
}))`
  width: ${({ theme }) => theme.metrics.getHeightFromDP('18%')}px;
  height: 100%;
`;

const TextContentContainer = styled(View)`
  width: ${({ theme }) => theme.metrics.width
    - (theme.metrics.extraLargeSize + theme.metrics.getHeightFromDP('18%'))}px;
  justify-content: center;
  margin-left: ${({ theme }) => theme.metrics.smallSize}px;
  padding-right: ${({ theme }) => theme.metrics.smallSize}px;
`;

const TopRowContent = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const DisheTitle = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
})`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${getTextSize('title')}px;
  font-family: CircularStd-Black;
  width: 70%;
`;

const DisheDescription = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 3,
})`
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${getTextSize('default')}px;
  font-family: CircularStd-Book;
`;

type Props = {
  navigation: Function,
  description: string,
  imageURL: string,
  price: number,
  stars: number,
  title: string,
  id: string,
};

const RecommendedSeeAllItemList = ({
  description,
  navigation,
  imageURL,
  price,
  title,
  stars,
  id,
}: Props): Object => (
  <TouchableWithoutFeedback
    onPress={() => navigation.navigate(ROUTE_NAMES.DISH_DETAIL, {
      [CONSTANTS.NAVIGATION_PARAM_IS_DISH_DETAIL_REVIEW_MODE]: true,
      [CONSTANTS.NAVIGATION_PARAM_ID]: id,
    })
    }
  >
    <Container>
      <DishImageWrapper>
        <DishImage
          imageURL={imageURL}
        />
      </DishImageWrapper>
      <TextContentContainer>
        <View>
          <TopRowContent>
            <DisheTitle>{title}</DisheTitle>
            <View>
              <FlagPrice
                price={price}
              />
            </View>
          </TopRowContent>
          <ReviewStars
            stars={stars}
          />
        </View>
        <DisheDescription>{description}</DisheDescription>
      </TextContentContainer>
    </Container>
  </TouchableWithoutFeedback>
);

export default withNavigation(RecommendedSeeAllItemList);
