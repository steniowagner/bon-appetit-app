// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as DishCreators } from '~/store/ducks/dish';

import { handleHiddenHeaderStyle } from '~/routes/headerUtils';
import DishDetail from './components/DishDetail';
import CONSTANTS from '~/utils/CONSTANTS';

type Props = {
  requestDishDetail: Function,
  navigation: Object,
  dish: Object,
};

class DishDetailContainer extends Component<Props, {}> {
  _subscriptionWillFocusEvent = {};

  componentDidMount() {
    const { requestDishDetail, navigation } = this.props;

    const id = navigation.getParam(CONSTANTS.NAVIGATION_PARAM_ID, '');

    this._subscriptionWillFocusEvent = navigation.addListener('willFocus', () => handleHiddenHeaderStyle(navigation, false, false));

    requestDishDetail(id);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { loading, error } = nextProps.dish;
    const { navigation } = this.props;

    handleHiddenHeaderStyle(navigation, loading, error);
  }

  componentWillUnmount() {
    this._subscriptionWillFocusEvent.remove();
  }

  render() {
    const { dish } = this.props;

    return <DishDetail
      {...dish}
    />;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(DishCreators, dispatch);

const mapStateToProps = state => ({
  dish: state.dish,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DishDetailContainer);
