// @flow

import React, { Component, Fragment } from 'react';
import {
  RefreshControl,
  FlatList,
  View,
} from 'react-native';

import { Creators as EventCreators } from 'store/ducks/events';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styled from 'styled-components';
import appStyles from 'styles';

import ItemNotFound from 'components/common/ItemNotFound';
import Loading from 'components/common/Loading';
import Messages from 'components/utils/Messages';

import AllEventsListItem from './IYCSeeallItemList';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  getAllEventsRequest: Function,
  getEvents: Object,
};

class AllEvents extends Component<Props, {}> {
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

  componentDidMount() {
    this.onRequestEvents();
  }

  onRequestEvents = (): void => {
    const { getAllEventsRequest } = this.props;

    getAllEventsRequest();
  }

  renderList = (): Object => {
    const { getEvents } = this.props;
    const { loadingAllEvents, events } = getEvents;

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
            refreshing={loadingAllEvents}
          />
        )}
        renderItem={({ item }) => (
          <AllEventsListItem
            restaurantsParticipating={item.restaurantsParticipating}
            description={item.description}
            dishesTypes={item.dishesTypes}
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

    const BoringCity = (
      <ItemNotFound
        description={'Unfortunately, there\'s nothing happening in your City today.'}
        tipText="More luck tomorrow!"
        funnyText="So Boring..."
        iconName="city"
      />
    );

    return (
      <Fragment>
        {shouldShowEventList && this.renderList()}
        {isLoading && <Loading />}
        {isEmpty && BoringCity}
      </Fragment>
    );
  }

  render() {
    const { getEvents } = this.props;

    const {
      loadingAllEvents,
      errorAllEvents,
      isEmpty,
    } = getEvents;

    return (
      <Container>
        {errorAllEvents ? alert(Messages.ERROR_MESSAGE) : this.renderMainContent(isEmpty, loadingAllEvents)}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(EventCreators, dispatch);

const mapStateToProps = state => ({
  getEvents: state.events,
});

export default connect(mapStateToProps, mapDispatchToProps)(AllEvents);
