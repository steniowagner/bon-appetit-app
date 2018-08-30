// @flow

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

const Container = styled(View)`
  width: 100%;
  flex-direction: row;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('7%')};
  background-color: ${({ color }) => color};
`;

const Cell = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  height: 100%;
  background-color: ${({ color }) => color};
`;

const MarkerWrapper = styled(Animated.View)`
  height: ${({ theme }) => theme.metrics.getHeightFromDP('0.5%')};
  width: ${({ width }) => width}px;
  background-color: transparent;
  align-self: flex-end;
  position: absolute;
`;

const Marker = styled(View)`
  height: 100%;
  width: ${({ width }) => width};
  background-color: ${({ theme }) => theme.colors.red};
`;

const OptionText = styled(Text)`
  color: ${({ color }) => color}
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.5%')}px;
  fontFamily: CircularStd-Medium;
`;

type Props = {
  data: Array<Object>,
  contentWidth: number,
  onChangeMenuIndex: Function,
  theme: string,
};

type State = {
  itemSelectedIndex: number,
  clickTimestamp: number,
  cellWidth: number,
};

class CustomTab extends Component<Props, State> {
  _markerPaddingLeft = new Animated.Value(0);

  state = {
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

    const { onChangeMenuIndex } = this.props;
    const { itemSelectedIndex } = this.state;

    if (newIndexSelected === itemSelectedIndex) {
      return;
    }

    onChangeMenuIndex(newIndexSelected);

    this.onMoveList(newIndexSelected);

    this.setMarkerPosition(newIndexSelected);

    this.setState({
      itemSelectedIndex: newIndexSelected,
      clickTimestamp: Date.now(),
    });
  }

  onMoveList = (indexSelected: number): void => {
    const { data } = this.props;

    const isFirstCell = indexSelected === 0;
    const isLastCell = indexSelected === data.length - 1;

    if (isFirstCell || isLastCell) {
      return;
    }

    this.flatListRef.scrollToIndex({ animated: true, index: indexSelected - 1 });
  }

  getCellWidth = (): number => {
    const { data, contentWidth } = this.props;
    const datasetLength = data.length;
    const cellWidth = (datasetLength >= 3) ? (contentWidth / 3) : (contentWidth / datasetLength);

    return cellWidth;
  }

  setMarkerPosition = (newIndexSelected: number): Object => {
    const { itemSelectedIndex, cellWidth } = this.state;
    const { data } = this.props;

    const shouldNotRenderMarker = (itemSelectedIndex > 0 && itemSelectedIndex < data.length - 1)
      && (newIndexSelected > 0 && newIndexSelected < data.length - 1);

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

    const isLastCellSelected = (newIndexSelected === (data.length - 1));
    if (isLastCellSelected) {
      const marginFactor = (data.length < 3) ? 1 : 2;
      newMarkerMargin = cellWidth * marginFactor;
    }

    Animated.timing(this._markerPaddingLeft, {
      toValue: newMarkerMargin,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  getCellTextColor = (itemSelectedIndex: number, cellIndex: number): string => {
    const { red } = appStyles.colors;
    const { theme } = this.props;

    const inactiveCellTextColor = (theme === 'light' ? appStyles.colors.primaryColor : appStyles.colors.defaultWhite);
    const cellTextColor = (itemSelectedIndex === cellIndex ? red : inactiveCellTextColor);

    return cellTextColor;
  }

  shouldAllowPress = () => {
    const { clickTimestamp } = this.state;
    const now = Date.now();

    const passedTimeEnough = (now - clickTimestamp) >= 600;

    return passedTimeEnough;
  }

  renderList = (themeColor: string): Object => {
    const { itemSelectedIndex, cellWidth } = this.state;
    const { data } = this.props;
    console.log(themeColor)
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={(ref) => { this.flatListRef = ref; }}
        data={data}
        keyExtractor={item => item.id}
        extraData={this.state}
        renderItem={({ item, index }) => (
          <Cell
            color={themeColor}
            width={cellWidth}
            onPress={() => {
              this.onCellPress(index);
            }}
          >
            <OptionText
              color={this.getCellTextColor(itemSelectedIndex, index)}
            >
              {item.title}
            </OptionText>
          </Cell>
        )}
      />
    );
  }

  renderMarker = () => {
    const { itemSelectedIndex, cellWidth } = this.state;

    const { contentWidth } = this.props;

    return (
      <MarkerWrapper
        width={contentWidth}
        style={{
          paddingLeft: this._markerPaddingLeft._value,
          transform: [
            {
              translateX: this._markerPaddingLeft.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
        }}
      >
        <Marker
          width={cellWidth}
          currentIndex={itemSelectedIndex}
        />
      </MarkerWrapper>
    );
  }

  render() {
    const { theme } = this.props;
    const themeColor = (theme === 'light' ? appStyles.colors.defaultWhite : appStyles.colors.primaryColor);

    return (
      <Container
        color={themeColor}
      >
        {this.renderList(themeColor)}
        {this.renderMarker()}
      </Container>
    );
  }
}

export default CustomTab;
