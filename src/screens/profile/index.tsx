import React, { Fragment } from 'react';
import Typography from '../../components/typography';
import { FlatList } from 'react-native';
import BottomTab from '../../components/bottomtab';

const Profile = () => {

  return (
    <Fragment>
      <Typography>Profile</Typography>
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

export default Profile;
