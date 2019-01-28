// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as DishCreators } from '~/store/ducks/dish';

import AllYouMightLike from './AllYouMightLike';

type Props = {
  requestAllDishes: Function,
  dish: Object,
};

class SeeAllYouMightLikeContainer extends Component<Props, {}> {
  componentDidMount() {
    const { requestAllDishes } = this.props;

    requestAllDishes();
  }

  render() {
    const { dish } = this.props;

    return <AllYouMightLike
      {...dish}
    />;
  }
}

const mapStateToProps = state => ({
  dish: state.dish,
});

const mapDispatchToProps = dispatch => bindActionCreators(DishCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeeAllYouMightLikeContainer);
