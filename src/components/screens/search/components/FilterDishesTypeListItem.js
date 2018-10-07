// @flow

import React, { PureComponent } from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Image,
} from 'react-native';

import styled from 'styled-components';
import appStyles from 'styles';

const Container = styled(Animated.View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('35%')}px;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')}px;
  justify-content: center;
  margin-left: ${({ theme, isFirst }) => (isFirst ? `${theme.metrics.mediumSize}px` : 0)};
  padding-vertical: ${({ theme }) => theme.metrics.getHeightFromDP('1%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('1.5%')}px;
  borderRadius: 10px;
`;

const SelectionMarker = styled(Animated.View)`
  justify-content: center;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.metrics.getHeightFromDP('0.5%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('1%')}px;
  borderRadius: 10px;
`;

const ImageContentContainer = styled(Animated.View)`
  width: 100%;
  height: 100%;
  position: absolute;
  borderRadius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const DisheImage = styled(Image).attrs({
  source: ({ uri }) => ({ uri }),
})`
  width: 100%;
  height: 100%;
  borderRadius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const DisheTypeSelectButtonWrapper = styled(Animated.View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.darkLayer};
  borderRadius: ${({ theme }) => theme.metrics.borderRadius}px;
`;

const DisheTypeText = styled(Animated.Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  text-align: center;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.8%')}px;
  fontFamily: CircularStd-Bold;
`;

type Props = {
  onRemoverDisheTypeFilter: Function,
  onAddDisheTypeFilter: Function,
  imageURI: string,
  title: string,
  id: string,
  isItemAlreadySelected: boolean,
  isFirst: boolean,
};

type State = {
  isSelected: boolean,
};

class FilterDishesListItem extends PureComponent<Props, State> {
  _selectorColor = new Animated.Value(0);
  _cardScale = new Animated.Value(0);
  _pressTimestamp = 0;

  state = {
    isSelected: false,
  };

  componentDidMount() {
    const { isItemAlreadySelected } = this.props;

    if (isItemAlreadySelected) {
      this.handleItemAlreadySelected();
    }
  }

  onSelectItem = () => {
    const shouldAllowPress = this.shouldAllowPress();
    if (!shouldAllowPress) {
      return;
    }

    const {
      onAddDisheTypeFilter,
      onRemoverDisheTypeFilter,
      id,
    } = this.props;

    const { isSelected } = this.state;

    this.handleItemAnimations();

    const properCallback = (isSelected ? onRemoverDisheTypeFilter : onAddDisheTypeFilter);

    this._pressTimestamp = Date.now();

    this.setState({
      isSelected: !isSelected,
    });

    properCallback(id);
  }

  shouldAllowPress = (): void => {
    const now = Date.now();

    const passedTimeEnough = (now - this._pressTimestamp) >= 1200;

    return passedTimeEnough;
  }

  handleItemAnimations = (): void => {
    const { isSelected } = this.state;

    const colorValue = (isSelected ? 0 : 1);

    Animated.sequence([
      Animated.timing(this._cardScale, {
        toValue: 0.1,
        duration: 100,
        easing: Easing.ease,
      }),

      Animated.timing(this._cardScale, {
        toValue: 0,
        duration: 100,
        easing: Easing.ease,
      }),

      Animated.timing(this._selectorColor, {
        toValue: colorValue,
        duration: 300,
      }),
    ]).start();
  }

  handleItemAlreadySelected = (): void => {
    const animateItemColor = Animated.timing(this._selectorColor, {
      toValue: 1,
      duration: 300,
    });

    this.setState({
      isSelected: true,
    }, () => {
      animateItemColor.start();
    });
  }

  renderCardContent = (): Object => {
    const { title } = this.props;

    return (
      <DisheTypeSelectButtonWrapper>
        <DisheTypeText>
          {title}
        </DisheTypeText>
      </DisheTypeSelectButtonWrapper>
    );
  }

  render() {
    const { isFirst, imageURI } = this.props;

    return (
      <Container
        isFirst={isFirst}
      >
        <SelectionMarker
          style={{
            backgroundColor: this._selectorColor.interpolate({
              inputRange: [0, 1],
              outputRange: [appStyles.colors.white, appStyles.colors.primaryColor],
            }),
            transform: [
              {
                scaleX: this._cardScale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 2],
                }),
              },
              {
                scaleY: this._cardScale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 2],
                }),
              },
            ],
          }
        }
        >
          <ImageContentContainer>
            <DisheImage
              uri={imageURI}
            />
          </ImageContentContainer>
          <TouchableWithoutFeedback
            onPress={() => this.onSelectItem()}
          >
            {this.renderCardContent()}
          </TouchableWithoutFeedback>
        </SelectionMarker>
      </Container>
    );
  }
}

export default FilterDishesListItem;
