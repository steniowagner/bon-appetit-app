// @flow

import React, { Fragment } from 'react';
import {
  Platform,
  Text,
  View,
} from 'react-native';

import styled from 'styled-components';
import appStyles from 'styles';

const getFontSize = (type: string): number => {
  const types = {
    sectionTitle: (Platform.OS === 'android' ? '5.5%' : '4.5%'),
    defaultText: (Platform.OS === 'android' ? '4.5%' : '4%'),
  };

  return appStyles.metrics.getWidthFromDP(types[type]);
};

const SectionWrapper = styled(View)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
`;

const SectionTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  margin-bottom: ${({ theme }) => (theme.metrics.extraSmallSize / 2)}px;
  font-size: ${getFontSize('sectionTitle')};
  fontFamily: CircularStd-Bold;
`;

const DefaultText = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 2,
})`
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${getFontSize('defaultText')};
  fontFamily: CircularStd-Book;
`;

const AddressText = styled(Text).attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 3,
})`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${getFontSize('defaultText')};
  fontFamily: CircularStd-Book;
`;

const SectionRow = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize + 2}px;
`;

const AddressWrapper = styled(View)`
  flex: 0.7;
`;

const OperatingHoursWrapper = styled(View)`
  flex: 1;
`;

type Props = {
  address: string,
  about: string,
  operatingHours: Object,
  isOpen: boolean,
};

const getOperatingHoursText = (operatingHours: Object): string => {
  const { open, close } = operatingHours;

  return `${open} - ${close}`;
};

const AboutRestaurantSection = ({
  operatingHours,
  address,
  about,
}: Props) => (
  <Fragment>
    <SectionWrapper>
      <SectionTitle>
        About
      </SectionTitle>
      <DefaultText>
        {about}
      </DefaultText>
    </SectionWrapper>

    <SectionRow>
      <OperatingHoursWrapper>
        <SectionWrapper>
          <SectionTitle>
            Address
          </SectionTitle>
          <AddressText>
            {address}
          </AddressText>
        </SectionWrapper>
      </OperatingHoursWrapper>

      <AddressWrapper>
        <SectionWrapper>
          <SectionTitle>
            Operating Hours
          </SectionTitle>
          <DefaultText>
            {getOperatingHoursText(operatingHours)}
          </DefaultText>
        </SectionWrapper>
      </AddressWrapper>
    </SectionRow>

  </Fragment>
);

export default AboutRestaurantSection;
