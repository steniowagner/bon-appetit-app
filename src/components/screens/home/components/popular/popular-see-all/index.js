import React, { Component, Fragment } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  View,
} from 'react-native';

import styled from 'styled-components';
import appStyles from 'styles';

import PopularSeeAllItemList from './PopularSeeAllItemList';

const List = styled(FlatList)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const LoadingWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

type Props = {

};

class PopularSeeAll extends Component<Props, {}> {
  static navigationOptions = () => ({
    title: 'Popular',
    headerStyle: {
      backgroundColor: appStyles.colors.primaryColor,
      borderBottomWidth: 0,
    },
    headerTintColor: appStyles.colors.defaultWhite,
    headerTitleStyle: {
      color: appStyles.colors.defaultWhite,
      fontFamily: 'CircularStd-Black',
    },
  });

  componentDidMount() {

  }

  renderLoading = (): Object => (
    <LoadingWrapper>
      <ActivityIndicator
        size={Platform.OS === 'ios' ? 'small' : 'large'}
        color={appStyles.colors.green}
      />
    </LoadingWrapper>
  );

  renderList = (dishes: Array<Object>): Object => (
    <List
      showsVerticalScrollIndicator={false}
      data={dishes}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <PopularSeeAllItemList
          description={item.description}
          imageURL={item.imageURL}
          price={item.price}
          title={item.title}
          stars={item.stars}
        />
      )}
    />
  )

  render() {
    const loading = true;

    return (
      <Fragment>
        {loading ? this.renderLoading() : this.renderList()}
      </Fragment>
    );
  }
}

export default PopularSeeAll;
