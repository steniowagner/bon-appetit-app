import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  BackHandler,
  Platform,
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
  background-color: ${({ theme }) => theme.colors.red};
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
  justify-content: center;
  align-items: center;
`;

const ApplyButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2.8%')}px;
  fontFamily: CircularStd-Black;
`;

const dataset = [{
  title: 'Pizzas',
  id: 'Pizza',
  imageURL: 'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/dishes-types/pizza.jpg',
}, {
  title: 'Barbecue',
  id: 'Barbecue',
  imageURL: 'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/dishes-types/babercue.jpeg',
}, {
  title: 'Desserts',
  id: 'Dessert',
  imageURL: 'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/dishes-types/desserts.jpg',
}, {
  title: 'Pasta',
  id: 'Pasta',
  imageURL: 'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/dishes-types/pasta.jpg',
}, {
  title: 'Fast-Food',
  id: 'Fast-Food',
  imageURL: 'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/dishes-types/fast-food.jpg',
}, {
  title: 'Homemade',
  id: 'Homemade',
  imageURL: 'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/dishes-types/homemade.jpg',
}, {
  title: 'Japanese',
  id: 'Japanese',
  imageURL: 'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/dishes-types/japanese.jpg',
}, {
  title: 'Salads',
  id: 'Salad',
  imageURL: 'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/dishes-types/salad.jpg',
}, {
  title: 'Seafood',
  id: 'Seafood',
  imageURL: 'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/dishes-types/seafood.jpg',
}];

type Props = {
  lastDishesTypesChosen: Array<Object>,
  onApplyFilterParams: Function,
  onToggleModal: Function,
  lastDistanceChosen: number,
  isModalVisible: boolean,
};

type State = {
  pressedBackButton: boolean,
  maxDistance: number,
};

class FilterModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.backButtonListener = null;
  }

  state = {
    maxDistance: 1,
    dishesTypes: [],
  };

  componentWillMount() {
    if (Platform.OS === 'android') {
      this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
  }

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

  componentWillUnmount() {
    if (Platform.OS === 'android' && this.backButtonListener) {
      this.backButtonListener.remove();
    }
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

  handleBackButtonClick = () => {
    const { onToggleModal } = this.props;

    onToggleModal();

    return true;
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
            imageURL={item.imageURL}
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
    const { isModalVisible, onToggleModal } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        onDismiss={() => console.tron.log('onDismiss')}
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
