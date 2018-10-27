import React, { Component, Fragment } from 'react';
import { FlatList } from 'react-native';

import { Creators as DishCreators } from 'store/ducks/dish';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styled from 'styled-components';

import Loading from 'components/common/Loading';
import RecommendedSeeAllItemList from './RecommendedSeeAllItemList';

const List = styled(FlatList)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  getAllDishesRequest: Function,
  dishInfo: Object,
};

class RecommendedSeeAll extends Component<Props, {}> {
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
        keyExtractor={item => item._id}
        data={dishes}
        renderItem={({ item, index }) => (
          <RecommendedSeeAllItemList
            hasBottomMargin={(index >= 0) && (index < dishes.length - 1)}
            price={parseFloat(item.price).toFixed(2)}
            description={item.description}
            imageURL={item.imageURL}
            distance={item.distance}
            reviews={item.reviews}
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

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedSeeAll);
