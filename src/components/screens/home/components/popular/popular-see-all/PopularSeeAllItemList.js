import React from 'react';
import {
  TouchableWithoutFeedback,
  Platform,
  Text,
  View,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import styled from 'styled-components';
import appStyles from 'styles';

import { ROUTE_NAMES } from 'components/screens/home/routes';
import { withNavigation } from 'react-navigation';

import ReviewStars from 'components/common/ReviewStars';
import FlagPrice from 'components/common/FlagPrice';

const getTextSize = (type: string): number => {
  const sizes = {
    title: (Platform.OS === 'android' ? '5%' : '4.5%'),
    default: (Platform.OS === 'android' ? '4%' : '3.5%'),
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

const DisheImageWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getHeightFromDP('18%')}px;
  height: 100%;
  border-radius: ${({ theme }) => theme.metrics.borderRadius}px;
  overflow: hidden;
`;

const DisheImage = styled(FastImage).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
  resizeMode: 'cover',
})`
  width: ${({ theme }) => theme.metrics.getHeightFromDP('18%')}px;
  height: 100%;
`;

const TextContentContainer = styled(View)`
  width: ${({ theme }) => theme.metrics.width - (theme.metrics.extraLargeSize + theme.metrics.getHeightFromDP('18%'))}px;
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
  fontFamily: CircularStd-Black;
  width: 70%;
`;

const DisheDescription = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 3,
})`
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${getTextSize('default')}px;
  fontFamily: CircularStd-Book;
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
  navigation.navigate(ROUTE_NAMES.DISHE_DETAIL_REVIEW, {
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
);

const RecommendedSeeAllItemList = ({
  description,
  navigation,
  imageURL,
  reviews,
  price,
  title,
  stars,
  id,
}: Props): Object => (
  <TouchableWithoutFeedback
    onPress={() => onPressItem(navigation, imageURL, id)}
  >
    <Container>
      {renderDisheImage(imageURL)}
      <TextContentContainer>
        {renderTopRowContent(title, reviews, price, stars)}
        <DisheDescription>
          {description}
        </DisheDescription>
      </TextContentContainer>
    </Container>
  </TouchableWithoutFeedback>
);

export default withNavigation(RecommendedSeeAllItemList);
