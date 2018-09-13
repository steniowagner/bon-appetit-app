import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

import styled from 'styled-components';
import appStyle from 'styles';

import RestaurantItemList from './RestaurantItemList';

const ListWrapper = styled(View)`
  width: 100%;
  padding-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  position: absolute;
`;

type Props = {
  indexRestaurantSelected: number,
  onSelectMarker: Function,
  restaurants: Array<any>,
};

class RestaurantList extends Component<Props, {}> {
  componentDidUpdate() {
    const { indexRestaurantSelected } = this.props;

    this.onChangeListIndex(indexRestaurantSelected);
  }

  onChangeListIndex = (index: number): void => {
    this._flatListRef.scrollToIndex({ animated: true, index });
  }

  onMomentumScrollEnd = (event: Object): void => {
    const { onSelectMarker } = this.props;
    const { contentOffset } = event.nativeEvent;

    const isHorizontalSwipeMovement = contentOffset.x > 0;
    const indexItemSelected = (isHorizontalSwipeMovement ? (Math.ceil(contentOffset.x / appStyle.metrics.width)) : 0);

    onSelectMarker(indexItemSelected);
  }

  render() {
    const { restaurants } = this.props;

    return (
      <ListWrapper>
        <FlatList
          onMomentumScrollEnd={event => this.onMomentumScrollEnd(event)}
          ref={(ref) => { this._flatListRef = ref; }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          extraData={this.state}
          data={restaurants}
          pagingEnabled
          horizontal
          renderItem={({ item }) => (
            <RestaurantItemList
              distance={item.distance}
              imageURL={item.imageURL}
              isOpen={item.isOpen}
              stars={item.stars}
              name={item.name}
              id={item.id}
            />
          )}
        />
      </ListWrapper>
    );
  }
}

export default RestaurantList;
