// @flow

import React from 'react';
import { Image, Text, View } from 'react-native';

import styled from 'styled-components';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
`;

const TextContainer = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('60%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
`;

const Title = styled(Text)`
  padding-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('7,5%')}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.primaryColor};
`;

const Description = styled(Text)`
  text-align: center;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.5%')}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.defaultWhite};
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.darkLayer};
  position: absolute;
`;

const ImageWrapper = styled(Image).attrs(({ image }) => ({
  source: { uri: image },
  resizeMode: 'cover',
}))`
  width: 100%;
  height: 100%;
  position: absolute;
`;

type Props = {
  description: string,
  image: string,
  title: string,
};

const IntroScreen = ({ description, image, title }: Props): Object => (
  <Wrapper>
    <ImageWrapper
      image={image}
    />
    <DarkLayer />
    <TextContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </TextContainer>
  </Wrapper>
);

export default IntroScreen;
