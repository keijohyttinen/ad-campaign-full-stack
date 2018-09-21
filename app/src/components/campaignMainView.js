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

class campaignMainView extends Component {
  render() {
    const data = this.props.data;
    return (
      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={({ item }) => <CampaignRow {...item} navigation={this.props.navigation} />}
      />
    );
  }
}

//keyExtractor={(item, index) => item.node.key}

export default createFragmentContainer(campaignMainView, graphql`
fragment campaignMainView on Campaign{
  id
  name
  goal
  total_budget
  status
}
`);