import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

import styled from 'styled-components';
import appStyles from 'styles';

const Container = styled(View)`
  width: 100%;
  flex-direction: row;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('7%')};
  background-color: ${({ theme }) => theme.colors.defaultWhite};
`;


const Cell = styled(View)`
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

const MarkerWrapper = styled(Animated.View)`
  height: ${({ theme }) => theme.metrics.getHeightFromDP('0.5%')};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.defaultWhite};
  align-self: flex-end;
  position: absolute;
`;

const Marker = styled(View)`
  height: 100%;
  width: ${({ width }) => width};
  background-color: ${({ theme }) => theme.colors.red};
`;

const OptionText = styled(Text)`
  color: ${({ color }) => color};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.5%')}px;
  fontFamily: CircularStd-Medium;
`;

const test = [
  { id: 1, item: 'Pizzas' },
  { id: 2, item: 'Churrascos' },
  { id: 3, item: 'Sobremesas' },
  { id: 4, item: 'Petiscos' },
  { id: 5, item: 'Frutos do Mar' },
  { id: 6, item: 'Sanduíches' },
  { id: 7, item: 'Sopas' },
  { id: 8, item: 'Saladas' },
];

class CustomTab extends Component {
  state = {
    markerMarginLeft: new Animated.Value(0),
    cellMarginLeft: new Animated.Value(0),
    itemSelectedIndex: 0,
    cellWidth: 0,
    clickTimestamp: 0,
  };

  componentDidMount() {
    const cellWidth = this.getCellWidth();

    this.setState({
      cellWidth,
    });
  }

  onCellPress = (newIndexSelected: number): Object => {
    const shouldAllowClick = this.shouldAllowClick();
    if (!shouldAllowClick) {
      return;
    }

    const { itemSelectedIndex } = this.state;

    if (newIndexSelected === itemSelectedIndex) {
      return;
    }

    this.setCellsWrapperPosition(itemSelectedIndex, newIndexSelected);

    this.setMarkerPosition(newIndexSelected);

    this.setState({
      itemSelectedIndex: newIndexSelected,
      clickTimestamp: Date.now(),
    });
  }

  getCellWidth = (): number => {
    const screenWidth = appStyles.metrics.width;
    const datasetLength = test.length;
    const cellWidth = (datasetLength >= 3) ? (screenWidth / 3) : (screenWidth / datasetLength);

    return cellWidth;
  }

  setCellsWrapperPosition = (previousIndex: number, newIndex: number): number => {
    if (test.length <= 3) {
      return;
    }

    if (newIndex === test.length - 1) {
      return;
    }

    if (newIndex === 0) {
      return;
    }

    const { cellWidth, cellMarginLeft } = this.state;

    const shouldMoveForward = (newIndex > 1) && (newIndex > previousIndex);
    const shouldMoveBackwards = (newIndex !== test.length - 2) && (newIndex < previousIndex);

    if (shouldMoveForward) {
      Animated.timing(cellMarginLeft, {
        toValue: cellMarginLeft._value - cellWidth,
        duration: 300,
      }).start();
    }

    if (shouldMoveBackwards) {
      Animated.timing(cellMarginLeft, {
        toValue: cellMarginLeft._value + cellWidth,
        duration: 300,
      }).start();
    }
  }

  setMarkerPosition = (newIndexSelected: number): Object => {
    const { markerMarginLeft, cellWidth } = this.state;

    let newMarkerMargin = cellWidth;

    const isFirstCellSelected = (newIndexSelected === 0);
    if (isFirstCellSelected) {
      newMarkerMargin = 0;
    }

    const isMiddleCellSelected = newIndexSelected === 1;
    if (isMiddleCellSelected) {
      newMarkerMargin = cellWidth;
    }

    const isLastCellSelected = (newIndexSelected === (test.length - 1));
    if (isLastCellSelected) {
      const marginFactor = (test.length < 3) ? 1 : 2;
      newMarkerMargin = cellWidth * marginFactor;
    }

    Animated.timing(markerMarginLeft, {
      toValue: newMarkerMargin,
      duration: 350,
    }).start();
  }

  getCellTextColor = (itemSelectedIndex: number, cellIndex): string => {
    const { red, darkText } = appStyles.colors;

    const cellTextColor = itemSelectedIndex === cellIndex ? red : darkText;

    return cellTextColor;
  }

  shouldAllowClick = () => {
    const { clickTimestamp } = this.state;
    const now = Date.now();

    const passedTimeEnough = (now - clickTimestamp) >= 500;

    return passedTimeEnough;
  }

  render() {
    const {
      itemSelectedIndex,
      markerMarginLeft,
      cellMarginLeft,
      cellWidth,
    } = this.state;

    const ItemsWrapper = Animated.createAnimatedComponent(View);

    return (
      <Container>
        <Animated.View style={{ marginLeft: cellMarginLeft, flexDirection: 'row' }}>
          {test.map(({ item, id }, index) => (
            <TouchableWithoutFeedback
              key={id}
              onPress={() => this.onCellPress(index)}
            >
              <Cell width={cellWidth}>
                <OptionText
                  color={this.getCellTextColor(itemSelectedIndex, index)}
                >
                  {item}
                </OptionText>
              </Cell>
            </TouchableWithoutFeedback>
          ))}
        </Animated.View>
        <MarkerWrapper style={{ marginLeft: markerMarginLeft }}>
          <Marker
            width={cellWidth}
            currentIndex={itemSelectedIndex}
          />
        </MarkerWrapper>
      </Container>
    );
  }
}

export default CustomTab;
