// @flow

import React, { Fragment } from 'react';
import { FlatList } from 'react-native';

import styled from 'styled-components';

import YouMightLikeSeeAllItemList from './YouMightLikeSeeAllItemList';
import { Alert, TYPES } from '~/components/common/alert';
import Loading from '~/components/common/Loading';

const List = styled(FlatList)`
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
    <Fragment>
      {loading && <Loading />}
      {error && <Alert
        type={TYPES.ERROR_SERVER_CONNECTION}
      />}
      {isDishesEmpty && <Alert
        type={TYPES.YOU_MIGHT_LIKE_EMPTY}
      />}
      {shouldRenderContent && (
        <List
          renderItem={({ item, index }) => (
            <YouMightLikeSeeAllItemList
              hasBottomMargin={index >= 0 && index < dishes.length - 1}
              price={parseFloat(item.price).toFixed(2)}
              description={item.description}
              imageURL={item.imageURL}
              distance={item.distance}
              reviews={item.reviews}
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
    </Fragment>
  );
};

export default AllYouMightLike;
