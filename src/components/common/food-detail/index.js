// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
} from 'react-native';

import styled from 'styled-components';
import appStyles from 'styles';

import FlagPrice from 'components/common/FlagPrice';
import ReviewStars from 'components/common/ReviewStars';
import CustomTab from 'components/common/CustomTab';
import FloatingActionButton from 'components/common/FloatingActionButton';

import RestaurantInfo from './components/RestaurantInfo';
import IngredientsItemList from './components/IngredientsItemList';
import ReviewItemList from './components/ReviewItemList';

const Container = styled(View)`
  flex: 1;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')}px;
  background-color: ${({ theme }) => theme.colors.darkLayer};
  padding: ${({ theme }) => theme.metrics.largeSize}px;
  justify-content: flex-end;
  position: absolute;
`;

const FoodImageContainer = styled(Image).attrs({
  source: ({ foodImage }) => ({ uri: foodImage }),
})`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')}px;
`;

const ContentContainer = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('75%')}px;
`;

const ContentCard = styled(View)`
  height: 100%;
  padding: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const FoodName = styled(Text).attrs({
  numberOfLines: 2,
  ellipsizeMode: 'tail',
})`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('65%')}px;
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.5%')};
  padding-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-family: CircularStd-Black;
`;

const FoodDescriptionWrapper = styled(View)``;

const FoodDescription = styled(Text).attrs({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.8%')};
  font-family: CircularStd-Book;
`;

const FoodDescriptionText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')};
  font-family: CircularStd-Bold;
`;

const TextContentContainer = styled(View)`
  width: 100%;
`;

const CustomTabWrapper = styled(View)`
  flex: 1;
`;

const TopContentWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const FlagPriceWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('16.5%')}px;
  justify-content: center;
`;

const FloatingActionButtonWrapper = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('25%') - 28}px;
  align-items: flex-end;
  padding-right: ${({ theme }) => theme.metrics.extraLargeSize}px;
  position: absolute;
`;

const ingredients = [
  { name: 'Ingrediente 1' },
  { name: 'Ingrediente 2' },
  { name: 'Ingrediente 3' },
  { name: 'Ingrediente 4' },
  { name: 'Ingrediente 5' },
  { name: 'Ingrediente 6' },
  { name: 'Ingrediente 7' },
  { name: 'Ingrediente 8' },
];

type Props = {
  navigation: Function,
};

class FoodDetail extends Component<Props, {}> {
  static navigationOptions = {
    headerTintColor: appStyles.colors.defaultWhite,
    headerTransparent: true,
    headerBackTitle: null,
  };

  renderTopContentWrapper = (): Object => {
    const { navigation } = this.props;

    const {
      foodTitle,
      price,
      stars,
      mode,
    } = navigation.getParam('payload', {});

    const shouldRenderFlagPrice = mode === 'detail';
    const renderFlagPrice = () => (
      shouldRenderFlagPrice && (
      <FlagPriceWrapper>
        <FlagPrice price={price} />
      </FlagPriceWrapper>)
    );

    return (
      <React.Fragment>
        <TopContentWrapper>
          <FoodName>
            {foodTitle}
          </FoodName>
          {renderFlagPrice()}
        </TopContentWrapper>
        <ReviewStars
          shouldShowReviewsText
          reviews={16}
          textColor="defaultWhite"
          stars={stars}
        />
      </React.Fragment>
    );
  }

  renderListSection = () => {
    const tabContentWidth = appStyles.metrics.getWidthFromDP('100%') - (appStyles.metrics.largeSize * 2);

    return (
      <CustomTabWrapper>
        <CustomTab
          contentWidth={tabContentWidth}
          data={[{ id: '1', item: 'Ingredients' }, { id: '2', item: 'Reviews' }]}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={ingredients}
          keyExtractor={item => item.name}
          onScroll={this.onScrollFoodInfoList}
          renderItem={({ item, index }) => (
            <ReviewItemList
              isFirst={index === 0}
              reviwerName="Stenio Wagner"
              review="Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI"
              stars={4.5}
            />
          )}
        />
      </CustomTabWrapper>
    );
  }

  renderTextContent = (): Object => {
    const { navigation } = this.props;
    const { foodDescription, mode } = navigation.getParam('payload', {});

    const shouldRenderRestaurantInfo = mode === 'detail';

    return (
      <TextContentContainer>
        {shouldRenderRestaurantInfo
          && (
          <RestaurantInfo
            restaurantName="Cabaña del Primo"
            status="open"
            distance={3}
          />)
        }
        <FoodDescriptionWrapper>
          <FoodDescriptionText>
            Description
          </FoodDescriptionText>
          <FoodDescription>
            {foodDescription}
          </FoodDescription>
        </FoodDescriptionWrapper>
      </TextContentContainer>
    );
  }

  renderFloatingActionButton = () => (
    <FloatingActionButtonWrapper>
      <FloatingActionButton
        name="star"
        color="yellow"
        action={() => {}}
      />
    </FloatingActionButtonWrapper>
  )

  render() {
    const { navigation } = this.props;

    const { mode, foodImage } = navigation.getParam('payload', {});

    return (
      <Container>
        <FoodImageContainer foodImage={foodImage} />
        <DarkLayer>
          {this.renderTopContentWrapper()}
        </DarkLayer>
        <ContentContainer>
          <ContentCard>
            {this.renderTextContent()}
            {this.renderListSection()}
          </ContentCard>
        </ContentContainer>
        {mode === 'review' && this.renderFloatingActionButton()}
      </Container>
    );
  }
}


export default FoodDetail;
