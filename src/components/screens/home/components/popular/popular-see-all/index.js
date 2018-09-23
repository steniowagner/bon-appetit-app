import React, { Component, Fragment } from 'react';
import { FlatList } from 'react-native';

import { Creators as DishCreators } from 'store/ducks/dish';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styled from 'styled-components';
import appStyles from 'styles';

import Loading from 'components/common/Loading';
import PopularSeeAllItemList from './PopularSeeAllItemList';

const List = styled(FlatList)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  getAllDishesRequest: Function,
  dishInfo: Object,
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
    const { getAllDishesRequest } = this.props;

    getAllDishesRequest();
  }

  renderList = (): Object => {
    const { dishInfo } = this.props;
    const { dishes } = dishInfo.requestAllData;

    return (
      <List
        showsVerticalScrollIndicator={false}
        data={dishes}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <PopularSeeAllItemList
            price={parseFloat(item.price).toFixed(2)}
            description={item.description}
            imageURL={item.imageURL}
            title={item.title}
            stars={item.stars}
            id={item._id}
          />
        )}
      />
    );
  }

  render() {
    const { dishInfo } = this.props;
    const { requestAllLoading, requestAllError } = dishInfo;
    const shouldShowContent = (!requestAllLoading && !requestAllError);

    return (
      <Fragment>
        {shouldShowContent ? this.renderList() : <Loading />}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(DishCreators, dispatch);

const mapStateToProps = state => ({
  dishInfo: state.dish,
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularSeeAll);
