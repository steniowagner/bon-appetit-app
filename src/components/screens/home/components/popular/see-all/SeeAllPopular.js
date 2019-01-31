// @flow

import React from 'react';
import { FlatList, View } from 'react-native';

import styled from 'styled-components';

import PopularSeeAllItemList from './PopularSeeAllItemList';
import { Alert, TYPES } from '~/components/common/alert';
import Loading from '~/components/common/Loading';

const Wrapper = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  isDishesEmpty: boolean,
  dishes: Array<Object>,
  loading: boolean,
  error: boolean,
};

const AllYouMightLike = ({
  isDishesEmpty,
  loading,
  dishes,
  error,
}: Props): Object => {
  const shouldRenderContent = !isDishesEmpty && !loading && !error;

  return (
    <Wrapper>
      {loading && <Loading />}
      {error && <Alert
        type={TYPES.ERROR_SERVER_CONNECTION}
      />}
      {isDishesEmpty && <Alert
        type={TYPES.POPULAR_EMPTY}
      />}
      {shouldRenderContent && (
        <FlatList
          renderItem={({ item }) => (
            <PopularSeeAllItemList
              price={parseFloat(item.price).toFixed(2)}
              description={item.description}
              imageURL={item.mediumImageURL}
              title={item.title}
              stars={item.stars}
              id={item.id}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          data={dishes}
        />
      )}
    </Wrapper>
  );
};

export default AllYouMightLike;
