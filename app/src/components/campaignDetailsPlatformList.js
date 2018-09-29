import React, { Component } from 'react';

import {
  FlatList,
  View,
  Text
} from 'react-native';


import {
  createFragmentContainer,
  graphql
} from 'react-relay';

import CampaignRow from './campaignRow';

class campaignDetailsPlatformList extends Component {
  render() {
    //Convert map to array with keyname as part of item
    const dataList = _.keys(this.props.data).map((platform) => {
      return this.props.data[platform]["platform"] = platform;
    });

    var some_map = _.chain(some_object_array)
      .map(item => [item.id, item])
      .object()
      .value()
    console.log("campaignPlatformList:", this.props);
    return (
      <FlatList
        style={{ flex: 1 }}
        data={dataList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CampaignDetailsPlatformRow {...item} navigation={this.props.navigation} />}
      />
    );
  }
}

/*
type Platforms {
    facebook: Platform
    instagram: Platform
    google: Platform
    adwords: Platform
}
*/

export default createFragmentContainer(campaignDetailsPlatformList, graphql`
fragment campaignDetailsPlatformList on Platforms{
    facebook {
      ...campaignDetailsPlatformRow
    }
    instagram{
      ...campaignDetailsPlatformRow
    }
    google {
      ...campaignDetailsPlatformRow
    }
    adwords{ 
      ...campaignDetailsPlatformRow
    }
}
`);