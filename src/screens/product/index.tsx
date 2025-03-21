import React, { Fragment } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/linking';

type RouteProps = RouteProp<RootStackParamList, "app/product">;
const Product = () => {
  const { params } = useRoute<RouteProps>();

  return (
    <Fragment>

    </Fragment>
  );
}

export default Product;
