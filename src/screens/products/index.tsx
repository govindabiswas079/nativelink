import React, { Fragment } from 'react';
import Typography from '../../components/typography';
import { FlatList } from 'react-native';
import BottomTab from '../../components/bottomtab';

const Products = () => {
    return (
        <Fragment>
            <Typography>Products</Typography>
            <FlatList
                data={[]}
                renderItem={() => {
                    return (
                        <Fragment>
                        </Fragment>
                    )
                }}
                contentContainerStyle={{

                }}
            />
            <BottomTab />
        </Fragment>
    );
}

export default Products;
