import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

import styled from 'styled-components';
import appStyle from 'styles';

import AllEventsListItem from './AllEventsListItem';

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding-horizontal: 4px;
`;

class AllEvents extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title || '',
    headerStyle: {
      backgroundColor: appStyle.colors.primaryColor,
    },
    headerTintColor: appStyle.colors.defaultWhite,
    headerTitleStyle: {
      color: appStyle.colors.defaultWhite,
      fontFamily: 'CircularStd-Black',
      fontSize: appStyle.metrics.navigationHeaderFontSize,
    },
  });

  getTestData = () => {
    const data = [];
  
    for (let i = 0; i < 12; i++) {
      data.push({
        id: `${i}`,
        eventImage: 'https://images.unsplash.com/photo-1511516412963-801b050c92aa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f23e22ac67f9dd47c1471491abfdda84&auto=format&fit=crop&w=1050&q=80',
        restaurantsParticipating: 12,
        eventTitle: 'Pasta Festival',
        eventDescription: 'An amazing event with most extensive variety of the best of Itaian cuisine!',
      });
    }
  
    return data;
  };

  render() {
    return (
      <Container>
        <FlatList          
          data={this.getTestData()}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <AllEventsListItem
              eventImage={item.eventImage}
              restaurantsParticipating={item.restaurantsParticipating}
              eventTitle={item.eventTitle}
              eventDescription={item.eventDescription}
            />
          )}
        />
      </Container>
    );
  }
}

export default AllEvents;
