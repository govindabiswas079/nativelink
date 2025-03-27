import React, { Fragment } from 'react';
import BottomTab from '../../components/bottomtab';
import { FlatList, Linking } from 'react-native';
import Typography from '../../components/typography';

const Dashboard = () => {
    return (
        <Fragment>
            <Typography>Dashboard</Typography>
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

export default Dashboard;
