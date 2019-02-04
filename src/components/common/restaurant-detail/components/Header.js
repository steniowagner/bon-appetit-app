// @flow

import React from 'react';
import { View } from 'react-native';

import ProgressiveImage from '~/components/common/ProgressiveImage';
import styled from 'styled-components';

const Container = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')}px;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.lightingDarkLayer};
`;

type Props = {
  thumbnailImageURL: string,
  imageURL: string,
};

const HeaderSection = ({ thumbnailImageURL, imageURL }: Props): Object => (
  <Container>
    <ProgressiveImage
      thumbnailImageURL={thumbnailImageURL}
      imageURL={imageURL}
    />
    <DarkLayer />
  </Container>
);

export default HeaderSection;
