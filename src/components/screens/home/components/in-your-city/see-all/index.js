// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as EventCreators } from '~/store/ducks/events';

import InYourCityAllEventsList from './InYourCityAllEventsList';

type Props = {
  requestAllEvents: Function,
  events: Object,
};

class AllEventsContainer extends Component<Props, {}> {
  componentDidMount() {
    const { requestAllEvents } = this.props;

    requestAllEvents();
  }

  render() {
    const { events } = this.props;

    return <InYourCityAllEventsList
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
)(AllEventsContainer);
