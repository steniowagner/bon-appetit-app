import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  FlatList,
} from 'react-native';

import styled from 'styled-components';
import appStyles from 'styles';

import Context from 'components/common/restaurant-detail/components/Context';

const Container = styled(View)`
  width: 100%;
  flex-direction: row;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('7%')};
  background-color: ${({ theme }) => theme.colors.defaultWhite};
`;

const Cell = styled(TouchableOpacity)`
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
  { id: '1', item: 'Pizzas' },
  { id: '2', item: 'Churrascos' },
  { id: '3', item: 'Sobremesas' },
  { id: '4', item: 'Petiscos' },
];

class CustomTab extends Component {
  state = {
    markerMarginLeft: new Animated.Value(0),
    itemSelectedIndex: 0,
    clickTimestamp: 0,
    cellWidth: 0,
  };

  componentDidMount() {
    const cellWidth = this.getCellWidth();

    this.setState({
      cellWidth,
    });
  }

  onCellPress = (newIndexSelected: number): void => {
    const shouldAllowPress = this.shouldAllowPress();
    if (!shouldAllowPress) {
      return;
    }

    const { itemSelectedIndex } = this.state;

    if (newIndexSelected === itemSelectedIndex) {
      return;
    }

    this.onMoveList(newIndexSelected);

    this.setMarkerPosition(newIndexSelected);

    this.setState({
      itemSelectedIndex: newIndexSelected,
      clickTimestamp: Date.now(),
    });
  }

  onMoveList = (indexSelected: number): void => {
    const isFirstCell = indexSelected === 0;
    const isLastCell = indexSelected === test.length - 1;

    if (isFirstCell || isLastCell) {
      return;
    }

    this.flatListRef.scrollToIndex({ animated: true, index: indexSelected - 1 });
  }

  getCellWidth = (): number => {
    const screenWidth = appStyles.metrics.width;
    const datasetLength = test.length;
    const cellWidth = (datasetLength >= 3) ? (screenWidth / 3) : (screenWidth / datasetLength);

    return cellWidth;
  }

  setMarkerPosition = (newIndexSelected: number): Object => {
    const { itemSelectedIndex, markerMarginLeft, cellWidth } = this.state;

    const shouldNotRenderMarker = (itemSelectedIndex > 0 && itemSelectedIndex < test.length - 1)
      && (newIndexSelected > 0 && newIndexSelected < test.length - 1);

    if (shouldNotRenderMarker) {
      return;
    }

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

  getCellTextColor = (itemSelectedIndex: number, cellIndex: number): string => {
    const { red, darkText } = appStyles.colors;

    const cellTextColor = (itemSelectedIndex === cellIndex) ? red : darkText;

    return cellTextColor;
  }

  shouldAllowPress = () => {
    const { clickTimestamp } = this.state;
    const now = Date.now();

    const passedTimeEnough = (now - clickTimestamp) >= 750;

    return passedTimeEnough;
  }

  renderList = (onSelectMenu: Function): Object => {
    const { itemSelectedIndex, cellWidth } = this.state;

    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        ref={(ref) => { this.flatListRef = ref; }}
        horizontal
        data={test}
        keyExtractor={item => item.id}
        extraData={this.state}
        renderItem={({ item, index }) => (
          <Cell
            width={cellWidth}
            onPress={() => {
              this.onCellPress(index);
              onSelectMenu(index);
            }}
          >
            <OptionText
              color={this.getCellTextColor(itemSelectedIndex, index)}
            >
              {item.item}
            </OptionText>
          </Cell>
        )}
      />
    );
  }

  renderMarker = () => {
    const {
      itemSelectedIndex,
      markerMarginLeft,
      cellWidth,
    } = this.state;

    return (
      <MarkerWrapper style={{ marginLeft: markerMarginLeft }}>
        <Marker
          width={cellWidth}
          currentIndex={itemSelectedIndex}
        />
      </MarkerWrapper>
    );
  }

  render() {
    return (
      <Context.Consumer>
        {context => (
          <Container>
            {this.renderList(context.onSelectMenu)}
            {this.renderMarker()}
          </Container>
        )}
      </Context.Consumer>
    );
  }
}

export default CustomTab;
