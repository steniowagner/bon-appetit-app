// @flow

import React, { Fragment } from 'react';
import {
  View,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';

import styled from 'styled-components';
import appStyle from 'styles';

import { ROUTE_NAMES } from 'components/screens/home/routes';

import Section from './components/Section';

import InYourCitySection from './components/in-your-city/components/home-list';
import YouMightLikeSection from './components/you-might-like/yml-home-section';
import Popular from './components/popular/popular-home-section';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const HomeMainContent = () => (
  <Fragment>
    <StatusBar barStyle="light-content" />
    <Container>
      {/*<ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Section
          title="In Your City"
          nextRoute={ROUTE_NAMES.ALL_EVENTS}
          render={() => <InYourCitySection />}
        />
        <Section
          title="You Might Like"
          nextRoute={ROUTE_NAMES.ALL_YOU_MIGHT_LIKE}
          render={() => <YouMightLikeSection />}
        />
        <Section
          title="Popular"
          nextRoute={ROUTE_NAMES.ALL_POPULAR}
          render={() => <Popular />}
        />
      </ScrollView>*/}
    </Container>
  </Fragment>
);

HomeMainContent.navigationOptions = {
  title: 'Bon Appetit',
  headerStyle: {
    backgroundColor: appStyle.colors.primaryColor,
    borderBottomWidth: 0,
  },
  headerTintColor: appStyle.colors.defaultWhite,
  headerTitleStyle: {
    color: appStyle.colors.defaultWhite,
    fontFamily: 'Modesta-Script',
    fontWeight: '200',
    fontSize: Platform.OS === 'ios' ? 26 : 30,
  },
};

export default HomeMainContent;
