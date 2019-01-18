// @flow

import React, { Component } from 'react';
import {
  TouchableOpacity, FlatList, Modal, View, Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

import FilterDishesTypeListItem from './FilterDishesTypeListItem';
import dishesTypesItem from './dishesTypesItems';
import MaxDistance from './MaxDistanceFilter';

const Container = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const ModalContainer = styled(View)`
  width: 100%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Header = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${({ theme }) => theme.metrics.largeSize}px;
`;

const ArrowIcon = styled(Icon).attrs({
  name: 'arrow-left',
  size: 30,
})`
  color: ${({ theme }) => theme.colors.darkText};
`;

const GapView = styled(View)`
  width: 30px;
  height: 30px;
`;

const FilterText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  text-align: center;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6.5%')}px;
  font-family: CircularStd-Black;
`;

const QuestionText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  margin-left: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  font-family: CircularStd-Medium;
`;

const DishesTypesSectionContainer = styled(View)`
  width: 100%;
`;

const MaxDistanceSectionContainer = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
`;

const ApplyButton = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('9%')}px;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const ApplyButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.5%')}px;
  font-family: CircularStd-Black;
`;

type Props = {
  lastDishesTypesChosen: Array<string>,
  onApplyFilterParams: Function,
  lastDistanceChosen: number,
  onToggleModal: Function,
};

type State = {
  dishesTypes: Array<string>,
  currentDistance: number,
};

class FilterModal extends Component<Props, State> {
  state = {
    currentDistance: 1,
    dishesTypes: [],
  };

  componentDidMount() {
    const { lastDishesTypesChosen, lastDistanceChosen } = this.props;

    this.setState({
      currentDistance: lastDistanceChosen || 1,
      dishesTypes: lastDishesTypesChosen,
    });
  }

  onChangeDistance = (currentDistance: number): void => {
    this.setState({
      currentDistance,
    });
  };

  onAddDishesTypeFilter = (disheType: string): void => {
    const { dishesTypes } = this.state;

    this.setState({
      dishesTypes: [...dishesTypes, disheType],
    });
  };

  onRemoverDishesTypeFilter = (disheType: string): void => {
    const { dishesTypes } = this.state;

    this.setState({
      dishesTypes: dishesTypes.filter(filter => filter !== disheType),
    });
  };

  checkDisheTypeAlreadySelected = (item: string): boolean => {
    const { lastDishesTypesChosen } = this.props;

    const isDishesTypeItemAlreadySelected = lastDishesTypesChosen.indexOf(item) >= 0;

    return isDishesTypeItemAlreadySelected;
  };

  renderHeader = () => {
    const { onToggleModal } = this.props;

    return (
      <Header>
        <TouchableOpacity
          onPress={onToggleModal}
        >
          <ArrowIcon />
        </TouchableOpacity>
        <FilterText>Filter</FilterText>
        <GapView />
      </Header>
    );
  };

  renderDishesTypesSection = () => (
    <DishesTypesSectionContainer>
      <QuestionText>Which kind of dish you're looking for?</QuestionText>
      <FlatList
        renderItem={({ item, index }) => (
          <FilterDishesTypeListItem
            onRemoverDisheTypeFilter={disheType => this.onRemoverDishesTypeFilter(disheType)
            }
            onAddDisheTypeFilter={disheType => this.onAddDishesTypeFilter(disheType)
            }
            isItemAlreadySelected={this.checkDisheTypeAlreadySelected(item.id)}
            imageURI={item.imageURI}
            isFirst={index === 0}
            title={item.title}
            id={item.id}
          />
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={dishesTypesItem}
        horizontal
      />
    </DishesTypesSectionContainer>
  );

  renderMaxDistanceSection = () => {
    const { currentDistance } = this.state;

    return (
      <MaxDistanceSectionContainer
        lastDistanceChoiced={currentDistance}
      >
        <QuestionText>Maximum distance you can travel?</QuestionText>
        <MaxDistance
          onChangeDistance={this.onChangeDistance}
          currentDistance={currentDistance}
        />
      </MaxDistanceSectionContainer>
    );
  };

  render() {
    const { onApplyFilterParams, onToggleModal } = this.props;
    const { currentDistance, dishesTypes } = this.state;

    return (
      <Modal
        onRequestClose={onToggleModal}
        animationType="slide"
        hardwareAccelerated
        transparent
      >
        <Container>
          <ModalContainer>
            {this.renderHeader()}
            {this.renderDishesTypesSection()}
            {this.renderMaxDistanceSection()}
            <ApplyButton
              onPress={() => onApplyFilterParams(currentDistance, dishesTypes)}
            >
              <ApplyButtonText>APPLY FILTERS</ApplyButtonText>
            </ApplyButton>
          </ModalContainer>
        </Container>
      </Modal>
    );
  }
}

export default FilterModal;
