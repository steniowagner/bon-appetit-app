// @flow

import React, { Component, Fragment } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Platform,
  Animated,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as SearchRestaurantsActions } from 'store/ducks/search-restaurants';

import Messages from 'components/utils/Messages';
import styled from 'styled-components';
import appStyles from 'styles';

import RestaurantItemList from 'components/common/RestaurantItemList';
import FloatingActionButton from 'components/common/FloatingActionButton';
import FilterModal from './components/FilterModal';
import RestaurantsNotFound from './components/RestaurantsNotFound';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  flex-direction: row;
  justify-content: flex-end;
`;

const ListWrapper = styled(View)`
  flex: 1;
  padding-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const FloatingActionButtonWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('22%')};
  height: ${({ theme }) => theme.metrics.getHeightFromDP('15%')};
  margin-top: ${({ listHeight }) => listHeight}px;
  margin-right: ${({ theme }) => theme.metrics.extraLargeSize}px;
  align-self: flex-end;
  position: absolute;
`;

const LoadingRestaurants = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const USER_LOCATION = {
  latitude: -3.7193101,
  longitude: -38.5892672,
};

type Props = {
  searchRestaurantsRequest: Function,
  restaurantsFromRequest: Object,
};

type State = {
  dishesTypes: Array<any>,
  isModalVisible: boolean,
  maxDistance: number,
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class Search extends Component<Props, State> {
  static navigationOptions = {
    title: 'Search Restaurants',
    headerStyle: {
      backgroundColor: appStyles.colors.primaryColor,
      borderBottomWidth: 0,
    },
    headerTintColor: appStyles.colors.defaultWhite,
    headerTitleStyle: {
      color: appStyles.colors.defaultWhite,
      fontFamily: 'CircularStd-Bold',
    },
  };

  _restaurantListMarginTop = new Animated.Value(0);
  _restaurantListHeight = 0;

  state = {
    isModalVisible: false,
    dishesTypes: [],
    maxDistance: 15,
  }

  componentDidMount() {
    this.onSearchRestaurants();
  }

  componentDidUpdate() {
    this.showRestaurantList();
  }

  onSearchRestaurants = (): void => {
    const { searchRestaurantsRequest } = this.props;

    const {
      dishesTypes,
      maxDistance,
    } = this.state;

    searchRestaurantsRequest({
      userLocation: USER_LOCATION,
      dishesTypes,
      maxDistance,
    });
  }

  onLayoutRestaurantList = (event: Object): void => {
    const { height } = event.nativeEvent.layout;

    this._restaurantListHeight = height;
  }

  onToggleModal = (): void => {
    const { isModalVisible } = this.state;

    this.setState({
      isModalVisible: !isModalVisible,
    });
  }

  onApplyFilterParams = (filterParams: Object): void => {
    const { maxDistance, dishesTypes } = filterParams;

    this.setState({
      maxDistance,
      dishesTypes,
    }, () => this.hideRestaurantsList());
  }

  hideRestaurantsList = (): void => {
    Animated.timing(this._restaurantListMarginTop, {
      toValue: this._restaurantListHeight,
      duration: 500,
      useNativeDriver: true,
    }).start(() => this.onSearchRestaurants());
  }

  showRestaurantList = (): void => {
    Animated.spring(this._restaurantListMarginTop, {
      toValue: 0,
      bounciness: 5,
      useNativeDriver: true,
    }).start();
  }

  renderRestaurantList = (): Object => {
    const { restaurantsFromRequest } = this.props;
    const { data } = restaurantsFromRequest;

    const { restaurants, loading, error } = data;

    if (loading || error) {
      return null;
    }

    return (
      <ListWrapper>
        <AnimatedFlatList
          style={{
            marginTop: this._restaurantListMarginTop._value,
            transform: [
              {
                translateY: this._restaurantListMarginTop.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          }}
          onLayout={this.onLayoutRestaurantList}
          showsVerticalScrollIndicator={false}
          data={restaurants}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <RestaurantItemList
              imageURL={item.imageURL}
              address={item.address}
              stars={item.stars}
              name={item.name}
              id={item.id}
            />
          )}
        />
      </ListWrapper>
    );
  }

  renderFloatingActionButton = (): Object => (
    <FloatingActionButtonWrapper
      listHeight={this._restaurantListHeight}
    >
      <FloatingActionButton
        name="tune"
        color="red"
        action={this.onToggleModal}
      />
    </FloatingActionButtonWrapper>
  );

  renderModal = (): Object => {
    const { maxDistance, dishesTypes } = this.state;

    return (
      <FilterModal
        lastDishesTypesChosen={dishesTypes}
        lastDistanceChosen={maxDistance}
        onToggleModal={() => this.onToggleModal()}
        onApplyFilterParams={params => this.onApplyFilterParams(params)}
      />
    );
  }

  renderLoadingRestaurants = (): Object => (
    <LoadingRestaurants>
      <ActivityIndicator
        color={appStyles.colors.green}
        size={Platform.OS === 'ios' ? 'small' : 'large'}
      />
    </LoadingRestaurants>
  );

  renderContent = (notFound: boolean, loading: boolean): Object => {
    const { isModalVisible } = this.state;

    return (
      <Fragment>
        {(notFound && !loading) ? <RestaurantsNotFound /> : this.renderRestaurantList()}
        {loading ? this.renderLoadingRestaurants() : this.renderFloatingActionButton()}
        {isModalVisible && this.renderModal()}
      </Fragment>
    );
  }

  render() {
    const { restaurantsFromRequest } = this.props;
    const { notFound, loading, error } = restaurantsFromRequest;

    return (
      <Container>
        {error ? alert(Messages.ERROR_MESSAGE) : this.renderContent(notFound, loading)}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(SearchRestaurantsActions, dispatch);

const mapStateToProps = state => ({
  restaurantsFromRequest: state.searchRestaurants,
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
