// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as EventCreators } from '~/store/ducks/events';

import { handleHiddenHeaderStyle } from '~/routes/headerUtils';
import EventDetails from './EventDetails';
import CONSTANTS from '~/utils/CONSTANTS';

type Props = {
  requestEventDetails: Function,
  navigation: Function,
  events: Object,
};

class EventDetailsContainer extends Component<Props, {}> {
  componentDidMount() {
    const { requestEventDetails, navigation } = this.props;

    const id = navigation.getParam(CONSTANTS.NAVIGATION_PARAM_ID, '');

    requestEventDetails(id);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { loading, error } = nextProps.events;
    const { navigation } = this.props;

    handleHiddenHeaderStyle(navigation, loading, error);
  }

  render() {
    const { events } = this.props;

    return <EventDetails
      {...events}
    />;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(EventCreators, dispatch);

const mapStateToProps = state => ({
  events: state.events,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventDetailsContainer);
