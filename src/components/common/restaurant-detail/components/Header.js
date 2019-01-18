// @flow

import React from 'react';
import { View } from 'react-native';

import ProgressiveImage from '~/components/common/ProgressiveImage';
import styled from 'styled-components';

const Container = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')}px;
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
  </Container>
);

export default HeaderSection;
