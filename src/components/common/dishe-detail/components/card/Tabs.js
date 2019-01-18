// @flow

import React, { Component } from 'react';
import { Animated, FlatList, View } from 'react-native';

import styled from 'styled-components';

import CustomTab from '~/components/common/CustomTab';

import IngredientsItemList from './IngredientsItemList';
import ReviewItemList from './ReviewItemList';

import appStyles from '~/styles';

const CustomTabWrapper = styled(View)`
  flex: 1;
  padding-top: ${({ theme }) => theme.metrics.smallSize}px;
`;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type Props = {
  ingredients: Array<string>,
  reviews: Array<Object>,
};

type State = {
  tabItemSelected: number,
};

class Tabs extends Component<Props, State> {
  _animatedFlatlistPosition = new Animated.Value(0);
  _flatListHeight = 0;

  state = {
    tabItemSelected: 0,
  };

  onChangeMenuIndex = (index: number): void => {
    const onAniamateListAppear = () => {
      Animated.spring(this._animatedFlatlistPosition, {
        toValue: 0,
        bounciness: 8,
        useNativeDriver: true,
      }).start();
    };

    Animated.timing(this._animatedFlatlistPosition, {
      toValue: this._flatListHeight,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      this.setState(
        {
          tabItemSelected: index,
        },
        () => onAniamateListAppear(),
      );
    });
  };

  renderListItem = (item: any, index: number): Object => {
    const { tabItemSelected } = this.state;

    const IngredientComponent = (
      <IngredientsItemList
        isFirst={index === 0}
        ingredient={item}
      />
    );

    const ReviewComponent = (
      <ReviewItemList
        profileImageURL={item.profileImageURL}
        isFirst={index === 0}
        review={item.review}
        stars={item.stars}
        name={item.name}
      />
    );

    const ProperComponent = tabItemSelected === 0 ? IngredientComponent : ReviewComponent;

    return ProperComponent;
  };

  render() {
    const { ingredients, reviews } = this.props;
    const { tabItemSelected } = this.state;

    const tabContentWidth = appStyles.metrics.getWidthFromDP('100%')
      - appStyles.metrics.largeSize * 4;
    const tabItems = [
      { id: '1', title: 'Ingredients' },
      { id: '2', title: 'Reviews' },
    ];
    const dataset = tabItemSelected === 0 ? ingredients : reviews;

    return (
      <CustomTabWrapper>
        <CustomTab
          onChangeMenuIndex={this.onChangeMenuIndex}
          contentWidth={tabContentWidth}
          data={tabItems}
          theme="white"
        />
        <AnimatedFlatList
          style={[
            {
              marginTop: this._animatedFlatlistPosition._value,
              transform: [
                {
                  translateY: this._animatedFlatlistPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            },
          ]}
          keyExtractor={item => (typeof item === 'string' ? item : item.id)}
          renderItem={({ item, index }) => this.renderListItem(item, index)}
          showsVerticalScrollIndicator={false}
          onLayout={(event: Object): void => {
            const { height } = event.nativeEvent.layout;
            this._flatListHeight = height;
          }}
          scrollEventThrottle={16}
          data={dataset}
        />
      </CustomTabWrapper>
    );
  }
}

export default Tabs;
