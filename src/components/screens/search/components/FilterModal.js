import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

import FilterFoodListItem from './FilterFoodListItem';
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

const TypeOfFoodSectionContainer = styled(View)`
  width: 100%;
`;

const MaxDistanceSectionContainer = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
`;

const ApplyButton = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('8%')}px;
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

const dataset = [{ title: 'Pizza' }, { title: 'Churrasco' }, { title: 'Salads' }, { title: 'Desserts' }, { title: 'Fast Food' }];

type Props = {
  onApplyFilterParams: Function,
  lastDistanceChoiced: Function,
  onAddFoodTypeFilter: Function,
  onRemoverFoodTypeFilter: Function,
  onToggleModal: Function,
  isModalVisible: boolean,
};

type State = {
  pressedBackButton: boolean,
  maxDistance: number,
};

class FilterModal extends Component<Props, State> {
  state = {
    maxDistance: 1,
  };

  onChangeMaxDistance = (maxDistance: number): void => {
    this.setState({
      maxDistance,
    });
  }

  onPressApplyFiltersButton = () => {
    const { onApplyFilterParams, onToggleModal } = this.props;
    const { maxDistance } = this.state;

    onApplyFilterParams({ maxDistance });

    onToggleModal();
  }

  checkFoodTypeItemAlreadySelected = (item: string): boolean => {
    const { lastFoodTypesChosen } = this.props;

    const isFoodTypeItemAlreadySelected = lastFoodTypesChosen.indexOf(item) >= 0;

    return isFoodTypeItemAlreadySelected;
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

  renderKindFoodSection = () => {
    const { onAddFoodTypeFilter, onRemoverFoodTypeFilter } = this.props;

    return (
      <TypeOfFoodSectionContainer>
        <QuestionText>
          {'Which kind of food you\'re looking for?'}
        </QuestionText>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={dataset}
          keyExtractor={item => item.title}
          renderItem={({ item, index }) => (
            <FilterFoodListItem
              isFirst={index === 0}
              isItemAlreadySelected={this.checkFoodTypeItemAlreadySelected(item.title)}
              title={item.title}
              onAddFoodTypeFilter={onAddFoodTypeFilter}
              onRemoverFoodTypeFilter={onRemoverFoodTypeFilter}
            />
          )}
        />
      </TypeOfFoodSectionContainer>
    );
  }

  renderMaxDistanceSection = () => {
    const { lastDistanceChoiced } = this.props;

    return (
      <MaxDistanceSectionContainer>
        <QuestionText>
          {'Maximum distance you can travel?'}
        </QuestionText>
        <MaxDistance
          lastDistanceChoiced={lastDistanceChoiced}
          onChangeMaxDistance={this.onChangeMaxDistance}
        />
      </MaxDistanceSectionContainer>
    );
  }

  render() {
    const { isModalVisible } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
      >
        <Container>
          <ModalContainer>
            {this.renderHeader()}
            {this.renderKindFoodSection()}
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
