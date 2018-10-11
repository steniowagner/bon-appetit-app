// @flow

import React from 'react';
import { View } from 'react-native';

import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

const Container = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')}px;
`;

const RestaurantImage = styled(FastImage).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
})`
  width: 100%;
  height: 100%;
  position: absolute;
`;

type Props = {
  restaurantImage: string,
};

const HeaderSection = ({ restaurantImage }: Props): Object => (
  <Container>
    <RestaurantImage
      imageURL={restaurantImage}
    />
  </Container>
);

export default HeaderSection;
