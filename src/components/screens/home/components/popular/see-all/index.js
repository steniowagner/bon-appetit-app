// @flow

import React, { Component, Fragment } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as DishCreators } from '~/store/ducks/dish';

import { Alert, TYPES } from '~/components/common/alert';
import Loading from '~/components/common/Loading';
import SeeAllPopular from './SeeAllPopular';

type Props = {
  requestAllDishes: Function,
  dish: Object,
};

class SeeAllPopularContainer extends Component<Props, {}> {
  componentDidMount() {
    const { requestAllDishes } = this.props;

    requestAllDishes();
  }

  render() {
    const { dish } = this.props;

    const {
      isDishesEmpty, loading, dishes, error,
    } = dish;

    const shouldRenderContent = !isDishesEmpty && !loading && !error;

    return (
      <Fragment>
        {loading && <Loading />}
        {error && <Alert
          type={TYPES.ERROR_SERVER_CONNECTION}
        />}
        {isDishesEmpty && <Alert
          type={TYPES.POPULAR_EMPTY}
        />}
        {shouldRenderContent && <SeeAllPopular
          dishes={dishes}
        />}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  dish: state.dish,
});

const mapDispatchToProps = dispatch => bindActionCreators(DishCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeeAllPopularContainer);
