import React, { Component } from 'react';
import {
  TouchableOpacity,
  FlatList,
  Modal,
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

import FilterDishesTypeListItem from './FilterDishesTypeListItem';
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
  margin: ${({ theme }) => theme.metrics.largeSize}px;
  align-items: center;
  justify-content: space-between;
`;

const ArrowIcon = styled(Icon).attrs({
  color: ({ theme }) => theme.colors.darkText,
  name: 'arrow-left',
  size: 30,
})`
  width: 30px;
  height: 30px;
`;

const GapView = styled(View)`
  width: 30px;
  height: 30px;
`;

const FilterText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('3.8%')}px;
  fontFamily: CircularStd-Black;
  text-align: center;
`;

const QuestionText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2.8%')}px;
  fontFamily: CircularStd-Medium;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  margin-left: ${({ theme }) => theme.metrics.extraLargeSize}px;
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
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2.8%')}px;
  fontFamily: CircularStd-Black;
`;

const dataset = [{
  title: 'Pizzas',
  id: 'Pizza',
  imageURI: 'pizza',
}, {
  title: 'Barbecue',
  id: 'Barbecue',
  imageURI: 'babercue',
}, {
  title: 'Desserts',
  id: 'Dessert',
  imageURI: 'desserts',
}, {
  title: 'Pasta',
  id: 'Pasta',
  imageURI: 'pasta',
}, {
  title: 'Fast-Food',
  id: 'Fast-Food',
  imageURI: 'fastfood',
}, {
  title: 'Homemade',
  id: 'Homemade',
  imageURI: 'homemade',
}, {
  title: 'Japanese',
  id: 'Japanese',
  imageURI: 'japanese',
}, {
  title: 'Salads',
  id: 'Salad',
  imageURI: 'salad',
}, {
  title: 'Seafood',
  id: 'Seafood',
  imageURI: 'seafood',
}];

type Props = {
  lastDishesTypesChosen: Array<Object>,
  onApplyFilterParams: Function,
  onToggleModal: Function,
  lastDistanceChosen: number,
};

type State = {
  pressedBackButton: boolean,
  maxDistance: number,
};

class FilterModal extends Component<Props, State> {
  state = {
    maxDistance: 1,
    dishesTypes: [],
  };

  componentDidMount() {
    const {
      lastDishesTypesChosen,
      lastDistanceChosen,
    } = this.props;

    this.setState({
      dishesTypes: lastDishesTypesChosen,
      maxDistance: lastDistanceChosen,
    });
  }

  onChangeMaxDistance = (maxDistance: number): void => {
    this.setState({
      maxDistance,
    });
  }

  onAddDishesTypeFilter = (disheType: string): void => {
    const { dishesTypes } = this.state;

    this.setState({
      dishesTypes: [...dishesTypes, disheType],
    });
  }

  onRemoverDishesTypeFilter = (disheType: string): void => {
    const { dishesTypes } = this.state;

    this.setState({
      dishesTypes: dishesTypes.filter(filter => filter !== disheType),
    });
  }

  onPressApplyFiltersButton = () => {
    const { onApplyFilterParams, onToggleModal } = this.props;
    const { maxDistance, dishesTypes } = this.state;

    onToggleModal();

    onApplyFilterParams({ maxDistance, dishesTypes });
  }

  checkDisheTypeAlreadySelected = (item: string): boolean => {
    const { lastDishesTypesChosen } = this.props;

    const isDishesTypeItemAlreadySelected = lastDishesTypesChosen.indexOf(item) >= 0;

    return isDishesTypeItemAlreadySelected;
  }

  renderHeader = () => {
    const { onToggleModal } = this.props;

    return (
      <Header>
        <TouchableOpacity
          onPress={() => onToggleModal()}
        >
          <ArrowIcon />
        </TouchableOpacity>
        <FilterText>
          Filter
        </FilterText>
        <GapView />
      </Header>
    );
  }

  renderDishesTypesSection = () => (
    <DishesTypesSectionContainer>
      <QuestionText>
        {'Which kind of dish you\'re looking for?'}
      </QuestionText>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={dataset}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <FilterDishesTypeListItem
            onRemoverDisheTypeFilter={disheType => this.onRemoverDishesTypeFilter(disheType)}
            isItemAlreadySelected={this.checkDisheTypeAlreadySelected(item.id)}
            onAddDisheTypeFilter={disheType => this.onAddDishesTypeFilter(disheType)}
            imageURI={item.imageURI}
            isFirst={index === 0}
            title={item.title}
            id={item.id}
          />
        )}
      />
    </DishesTypesSectionContainer>
  );

  renderMaxDistanceSection = () => {
    const { lastDistanceChosen } = this.props;

    return (
      <MaxDistanceSectionContainer
        lastDistanceChoiced={lastDistanceChosen}
      >
        <QuestionText>
          {'Maximum distance you can travel?'}
        </QuestionText>
        <MaxDistance
          lastDistanceChosen={lastDistanceChosen}
          onChangeMaxDistance={this.onChangeMaxDistance}
        />
      </MaxDistanceSectionContainer>
    );
  }

  render() {
    const { onToggleModal } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent
        onRequestClose={() => onToggleModal()}
        hardwareAccelerated
      >
        <Container>
          <ModalContainer>
            {this.renderHeader()}
            {this.renderDishesTypesSection()}
            {this.renderMaxDistanceSection()}
            <ApplyButton
              onPress={() => this.onPressApplyFiltersButton()}
            >
              <ApplyButtonText>
                APPLY FILTERS
              </ApplyButtonText>
            </ApplyButton>
          </ModalContainer>
        </Container>
      </Modal>
    );
  }
}

export default FilterModal;
