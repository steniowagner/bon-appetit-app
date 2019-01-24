// @flow

import React, { Component } from 'react';
import { StatusBar, FlatList, View } from 'react-native';

import styled from 'styled-components';

import BottomPagination from './components/BottomPagination';
import GetStartedButton from './components/GetStartedButton';
import { SCREENS, TYPES } from './components/SCREENS_TYPES';
import IntroScreen from './components/IntroScreen';

import { ROUTE_NAMES } from '~/routes/index';

const Container = styled(View)`
  flex: 1;
`;

const IntroScreenWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  height: ${({ theme }) => theme.metrics.height}px;
`;

const BottomContent = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('85%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  position: absolute;
`;

const PAGES = [
  SCREENS[TYPES.FIND_RESTAURANTS],
  SCREENS[TYPES.WITH_YOUR_TASTE],
  SCREENS[TYPES.CHOOSE_YOUR_MEAL],
];

type Props = {
  navigation: Object,
};

type State = {
  currentPageIndex: number,
};

class OnboardingIntro extends Component<Props, State> {
  state = {
    currentPageIndex: 0,
  };

  onIncrementPageIndex = (): void => {
    const { currentPageIndex } = this.state;

    this.setState(
      {
        currentPageIndex: currentPageIndex + 1,
      },
      () => this.onSlidePage(),
    );
  };

  onDecrementPageIndex = (): void => {
    const { currentPageIndex } = this.state;

    this.setState(
      {
        currentPageIndex: currentPageIndex - 1,
      },
      () => this.onSlidePage(),
    );
  };

  onSlidePage = (): void => {
    const { currentPageIndex } = this.state;

    this._pagesListRef.scrollToIndex({
      animated: true,
      index: currentPageIndex,
    });
  };

  renderPages = (): Object => (
    <FlatList
      renderItem={({ item }) => (
        <IntroScreenWrapper>
          <IntroScreen
            {...item}
          />
        </IntroScreenWrapper>
      )}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.title}
      ref={(ref: any): void => {
        this._pagesListRef = ref;
      }}
      scrollEnabled={false}
      pagingEnabled
      data={PAGES}
      horizontal
    />
  );

  renderPaginationController = (): Object => {
    const { currentPageIndex } = this.state;
    const { navigation } = this.props;

    const PAGINATION_CONTROLLERS = [
      <BottomPagination
        onPressRightButton={this.onIncrementPageIndex}
        onPressLeftButton={() => navigation.navigate(ROUTE_NAMES.LOGIN)}
        currentIndex={0}
        numberOfDots={3}
        withSkip
      />,
      <BottomPagination
        onPressRightButton={this.onIncrementPageIndex}
        onPressLeftButton={this.onDecrementPageIndex}
        currentIndex={1}
        numberOfDots={3}
      />,
      <GetStartedButton />,
    ];

    const Controller = PAGINATION_CONTROLLERS[currentPageIndex];

    return <BottomContent>{Controller}</BottomContent>;
  };

  render() {
    return (
      <Container>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
          animated
        />
        {this.renderPages()}
        {this.renderPaginationController()}
      </Container>
    );
  }
}

export default OnboardingIntro;
