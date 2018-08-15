import React from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';

const Container = styled(TouchableOpacity)`
  height: ${({ theme }) => (theme.metrics.height / 5)}px;
  width: ${({ theme }) => (theme.metrics.width / 1.5)}px;
  margin-left: ${({ theme, index }) => (index === 0 ? theme.metrics.largePadding : 0)}px;
  margin-right: ${({ theme }) => theme.metrics.smallPadding}
  border-radius: 6px;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.darkLayer};
  border-radius: 6px;
`;

const EventTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-family: CircularStd-Black;
  font-size: 16px;
  padding-bottom: 4px;
`;

const EventDescription = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-family: CircularStd-Medium;
  text-align: center;
  font-size: 12px;
`;

const EventImage = styled(Image).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
})`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 6px;
`;

const AboutEventWrapper = styled(View)`
  width: 100%;
  height: 100%;
  padding: 12px;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

type Props = {
  eventTitle: string,
  eventDescription: string,
  eventImage: string,
  index: number,
};

const InYourCityListItem = ({
  eventTitle,
  eventDescription,
  eventImage,
  index,
}: Props) => (
  <Container index={index}>
    <EventImage imageURL={eventImage} />
    <DarkLayer />
    <AboutEventWrapper>
      <EventTitle>
        {eventTitle}
      </EventTitle>
      <EventDescription>
        {eventDescription}
      </EventDescription>
    </AboutEventWrapper>
  </Container>
);

export default InYourCityListItem;
