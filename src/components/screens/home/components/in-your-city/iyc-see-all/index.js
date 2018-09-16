// @flow

import React, { Component, Fragment } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  Platform,
  FlatList,
  View,
} from 'react-native';

import { Creators as EventCreators } from 'store/ducks/events';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styled from 'styled-components';
import appStyles from 'styles';

import Messages from 'components/utils/Messages';
import AllEventsListItem from './IYCSeeallItemList';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const LoadingContainer = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

type Props = {
  getEventsRequest: Function,
  eventRequest: Object,
};

type State = {
  events: Array<any>,
};

class AllEvents extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title || '',
    headerStyle: {
      backgroundColor: appStyles.colors.primaryColor,
      borderBottomWidth: 0,
    },
    headerTintColor: appStyles.colors.defaultWhite,
    headerTitleStyle: {
      fontSize: appStyles.metrics.navigationHeaderFontSize,
      fontFamily: 'CircularStd-Black',
      color: appStyles.colors.defaultWhite,
    },
  });

  state = {
    events: [],
  };

  componentDidMount() {
    this.onRequestEvents();
  }

  componentWillReceiveProps(nextProps) {
    const { eventRequest } = nextProps;
    const { loading, error, data } = eventRequest;

    const shouldUpdateEvents = !loading && !error;

    if (shouldUpdateEvents) {
      const { events } = this.state;

      this.setState({
        events: [...events, ...data.events],
      });
    }
  }

  onRequestEvents = (): void => {
    const { getEventsRequest } = this.props;

    getEventsRequest();
  }

  onRefreshList = (): void => {
    this.onRequestEvents();
  }

  renderLoading = (): Object => (
    <LoadingContainer>
      <ActivityIndicator
        color={appStyles.colors.primaryColor}
        size={Platform.OS === 'ios' ? 'small' : 'large'}
      />
    </LoadingContainer>
  )

  renderList = (): Object => {
    const { eventRequest } = this.props;
    const { loading } = eventRequest;

    const { events } = this.state;

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={events}
        refreshControl={(
          <RefreshControl
            onRefresh={() => this.onRequestEvents()}
            progressBackgroundColor={appStyles.colors.green}
            tintColor={appStyles.colors.green}
            colors={[appStyles.colors.white]}
            refreshing={loading}
          />
        )}
        renderItem={({ item }) => (
          <AllEventsListItem
            restaurantsParticipating={item.restaurantsParticipating}
            description={item.description}
            imageURL={item.imageURL}
            title={item.title}
            id={item.id}
          />
        )}
      />
    );
  }

  renderMainContent = (isEmpty: boolean, isLoading: boolean): Object => {
    const shouldShowEventList = !isEmpty && !isLoading;

    return (
      <Fragment>
        {isLoading && this.renderLoading()}
        {shouldShowEventList && this.renderList()}
      </Fragment>
    );
  }

  render() {
    const { eventRequest } = this.props;
    const {
      isEmpty,
      loading,
      error,
    } = eventRequest;

    return (
      <Container>
        {error ? alert(Messages.ERROR_MESSAGE) : this.renderMainContent(isEmpty, loading)}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(EventCreators, dispatch);

const mapStateToProps = state => ({
  eventRequest: state.events,
});

export default connect(mapStateToProps, mapDispatchToProps)(AllEvents);
