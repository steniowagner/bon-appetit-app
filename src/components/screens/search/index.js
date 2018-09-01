// @flow

import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

import styled from 'styled-components';
import appStyles from 'styles';

import RestaurantItemList from 'components/common/restaurant-item-list';
import FloatingActionButton from 'components/common/FloatingActionButton';
import FilterModal from './components/FilterModal';

const restaurants = [{
  id: '1',
  name: 'Jovem Lanches',
  address: 'Rosinha Sampaio st., Quintino Cunha, Fortaleza',
  picURL: '',
  stars: 4.5,
  reviews: 17,
},
{
  id: '12',
  name: 'Jovem Lanches',
  address: 'Rosinha Sampaio st., Quintino Cunha, Fortaleza',
  picURL: '',
  stars: 4.5,
  reviews: 17,
},
{
  id: '31',
  name: 'Jovem Lanches',
  address: 'Rosinha Sampaio st., Quintino Cunha, Fortaleza',
  picURL: '',
  stars: 4.5,
  reviews: 17,
},
{
  id: '4',
  name: 'Jovem Lanches',
  address: 'Rosinha Sampaio st., Quintino Cunha, Fortaleza',
  picURL: '',
  stars: 4.5,
  reviews: 17,
},
{
  id: '123',
  name: 'Jovem Lanches',
  address: 'Rosinha Sampaio st., Quintino Cunha, Fortaleza',
  picURL: '',
  stars: 4.5,
  reviews: 17,
}];

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  flex-direction: row;
  justify-content: flex-end;
`;

const ListWrapper = styled(View)`
  flex: 1;
  padding-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const FloatingActionButtonWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('22%')};
  height: ${({ theme }) => theme.metrics.getHeightFromDP('15%')};
  margin-top: ${({ listHeight }) => listHeight}px;
  margin-right: ${({ theme }) => theme.metrics.extraLargeSize}px;
  align-self: flex-end;
  position: absolute;
`;

class Search extends Component {
  static navigationOptions = {
    title: 'Search Restaurants',
    headerStyle: {
      backgroundColor: appStyles.colors.primaryColor,
    },
    headerTintColor: appStyles.colors.defaultWhite,
    headerTitleStyle: {
      color: appStyles.colors.defaultWhite,
      fontFamily: 'CircularStd-Bold',
      fontWeight: '900',
      fontSize: appStyles.metrics.navigationHeaderFontSize,
    },
  };

  _restaurantListHeight = 0;

  state = {
    isModalVisible: false,
    foodTypes: [],
    maxDistance: 1,
  }

  onLayoutRestaurantList = (event: Object): void => {
    const { height } = event.nativeEvent.layout;
    this._restaurantListHeight = height;
  }

  onToggleModal = () => {
    const { isModalVisible } = this.state;

    this.setState({
      isModalVisible: !isModalVisible,
    });
  }

  onApplyFilterParams = (filterParams: Object): void => {
    const { maxDistance, foodTypes } = filterParams;

    this.setState({
      maxDistance,
      foodTypes,
    });
  }

  renderRestaurantList = () => (
    <ListWrapper>
      <FlatList
        onLayout={this.onLayoutRestaurantList}
        showsVerticalScrollIndicator={false}
        data={restaurants}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RestaurantItemList
            name={item.name}
            address={item.address}
            picURL={item.picURL}
            stars={item.stars}
            reviews={item.reviews}
          />
        )}
      />
    </ListWrapper>
  );

  renderFloatingActionButton = () => (
    <FloatingActionButtonWrapper
      listHeight={this._restaurantListHeight}
    >
      <FloatingActionButton
        name="filter-variant"
        color="red"
        action={this.onToggleModal}
      />
    </FloatingActionButtonWrapper>
  );

  render() {
    const {
      isModalVisible,
      maxDistance,
      foodTypes,
    } = this.state;

    return (
      <Container>
        {this.renderRestaurantList()}
        {this.renderFloatingActionButton()}
        <FilterModal
          lastFoodTypesChosen={foodTypes}
          lastDistanceChosen={maxDistance}
          onToggleModal={() => this.onToggleModal()}
          isModalVisible={isModalVisible}
          onApplyFilterParams={params => this.onApplyFilterParams(params)}
        />
      </Container>
    );
  }
}

export default Search;
