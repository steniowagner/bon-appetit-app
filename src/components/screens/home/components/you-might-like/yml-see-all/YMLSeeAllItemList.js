import React, { Fragment } from 'react';
import {
  TouchableOpacity,
  Platform,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import { ROUTE_NAMES } from 'components/screens/home/routes';
import { withNavigation } from 'react-navigation';

import ReviewStars from 'components/common/ReviewStars';
import FlagPrice from 'components/common/FlagPrice';

const Container = styled(View)`
  height: ${({ theme }) => theme.metrics.getHeightFromDP('30%')};
  margin-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  padding: ${({ theme }) => theme.metrics.smallSize}px;
  padding-right: ${({ theme }) => theme.metrics.mediumSize}px;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  background-color: ${({ theme }) => theme.colors.defaultWhite};
`;

const DisheImageWrapper = styled(View)`
  width: 30%;
  height: 100%;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  overflow: hidden;
  position: absolute;
`;

const DisheImage = styled(FastImage).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: ${({ theme }) => theme.metrics.largeSize}px;
`;

const TextContentContainer = styled(View)`
  height: 100%;
  justify-content: space-between;
  margin-left: ${({ theme }) => theme.metrics.getWidthFromDP('28%')}px;
  padding-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
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
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2.8%')}px;
  fontFamily: CircularStd-Black;
  width: 75%;
`;

const DisheDescription = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 4,
})`
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2.5%')}px;
  fontFamily: CircularStd-Book;
`;

const BottomRowContent = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const RestaurantDistance = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2.6%')}px;
  fontFamily: CircularStd-Bold;
`;

const ArrowIconWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ArrowIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.darkText,
  name: 'arrow-right',
  size: 25,
})`
  width: 25px;
  height: 25px;
`;

type Props = {
  description: string,
  imageURL: string,
  title: string,
  id: string,
  reviews: number,
  price: number,
  stars: number,
  navigation: Function,
};

const onPressItem = (navigation: Function, imageURL: string, id: string): void => {
  navigation.navigate(ROUTE_NAMES.FOOD_DETAIL, {
    payload: { imageURL, id },
  });
};

const renderDisheImage = (imageURL: string): Object => (
  <DisheImageWrapper>
    <DisheImage
      imageURL={imageURL}
    />
  </DisheImageWrapper>
);

const renderTopRowContent = (title: string, reviews: string, price: number, stars: number): Object => (
  <View>
    <TopRowContent>
      <DisheTitle>
        {title}
      </DisheTitle>
      <FlagPrice
        price={price}
      />
    </TopRowContent>
    <ReviewStars
      shouldShowReviewsText
      textColor="darkText"
      reviews={reviews}
      stars={stars}
    />
  </View>
);

const renderBottomRowContent = (distance: number, imageURL: string, id: string, navigation: Function): Object => (
  <BottomRowContent>
    <RestaurantDistance>
      {`${distance} km from you`}
    </RestaurantDistance>
    <ArrowIconWrapper>
      <TouchableOpacity
        onPress={() => onPressItem(navigation, imageURL, id)}
      >
        <ArrowIcon />
      </TouchableOpacity>
    </ArrowIconWrapper>
  </BottomRowContent>
);

const YMLSeeAllItemList = ({
  description,
  navigation,
  imageURL,
  reviews,
  price,
  title,
  stars,
  id,
}: Props): Object => (
  <Container
    style={{
      ...Platform.select({
        ios: {
          elevation: 1,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowRadius: 3,
          shadowOpacity: 0.35,
        },
        android: {
          elevation: 4,
          shadowOffset: {
            width: 1,
            height: -3,
          },
          shadowRadius: 2,
          shadowOpacity: 5.0,
        },
      }),
    }}
  >
    <View>
      {renderDisheImage(imageURL)}
      <TextContentContainer>
        {renderTopRowContent(title, reviews, price, stars)}
        <DisheDescription>
          {description}
        </DisheDescription>
        {renderBottomRowContent(parseFloat(reviews / stars).toFixed(1), imageURL, id, navigation)}
      </TextContentContainer>
    </View>
  </Container>
);

export default withNavigation(YMLSeeAllItemList);
