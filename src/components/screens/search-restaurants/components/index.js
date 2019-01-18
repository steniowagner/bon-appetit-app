// @flow

import React, { PureComponent } from 'react';
import { View } from 'react-native';

import styled from 'styled-components';

import FloatingActionButton from '~/components/common/FloatingActionButton';
import { Alert, TYPES } from '~/components/common/alert';
import Loading from '~/components/common/Loading';

import RestaurantsList from './RestaurantsList';
import Modal from './modal';

const Container = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.white};
`;

const FloatingActionButtonWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('22%')}px;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('15%')}px;
  align-self: flex-end;
  position: absolute;
  margin-right: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const MessageWrapper = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
`;

type Props = {
  onSearchRestaurants: Function,
  notFound: boolean,
  loading: boolean,
  error: boolean,
  data: Object,
};

type State = {
  isRequestingNewData: boolean,
  dishesTypes: Array<string>,
  isModalVisible: boolean,
  isFirstRender: boolean,
  maxDistance: number,
};

class SearchRestaurants extends PureComponent<Props, State> {
  state = {
    isRequestingNewData: false,
    isModalVisible: false,
    isFirstRender: true,
    dishesTypes: [],
    maxDistance: 1,
  };

  componentWillReceiveProps() {
    this.setState({
      isRequestingNewData: false,
    });
  }

  onToggleModal = (): void => {
    const { isModalVisible } = this.state;

    this.setState({
      isModalVisible: !isModalVisible,
    });
  };

  onApplyFilterParams = (
    maxDistance: number,
    dishesTypes: Array<string>,
  ): void => {
    this.setState({
      isRequestingNewData: true,
      isModalVisible: false,
      isFirstRender: false,
      maxDistance,
      dishesTypes,
    });
  };

  renderFloatingActionButton = (): Object => (
    <FloatingActionButtonWrapper>
      <FloatingActionButton
        action={this.onToggleModal}
        color="primaryColor"
        name="tune"
      />
    </FloatingActionButtonWrapper>
  );

  render() {
    const {
      onSearchRestaurants, notFound, loading, error, data,
    } = this.props;

    const {
      isRequestingNewData,
      isModalVisible,
      isFirstRender,
      dishesTypes,
      maxDistance,
    } = this.state;

    const shouldShowMessages = loading || isFirstRender || error || notFound;

    return (
      <Container>
        {shouldShowMessages && (
          <MessageWrapper>
            {loading && <Loading />}
            {isFirstRender && <Alert
              type={TYPES.INITIAL_SEARCH}
            />}
            {error && <Alert
              type={TYPES.ERROR_SERVER_CONNECTION}
            />}
            {notFound && <Alert
              type={TYPES.SEARCH_EMPTY}
            />}
          </MessageWrapper>
        )}
        {
          <RestaurantsList
            onSearchRestaurants={onSearchRestaurants}
            dishesTypes={dishesTypes}
            maxDistance={maxDistance}
            isRequestingNewData={isRequestingNewData}
            restaurants={data.restaurants}
          />
        }
        {!loading && this.renderFloatingActionButton()}
        {isModalVisible && (
          <Modal
            onApplyFilterParams={this.onApplyFilterParams}
            lastDishesTypesChosen={dishesTypes}
            onToggleModal={this.onToggleModal}
            lastDistanceChosen={maxDistance}
          />
        )}
      </Container>
    );
  }
}

export default SearchRestaurants;
