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

import CampaignMainRow from './campaignMainRow';

class campaignMainViewList extends Component {
  render() {
    const dataList = this.props.data.campaigns;
    console.log("campaignMainView:", JSON.stringify(dataList));
    return (
      <FlatList
        style={{ flex: 1 }}
        data={dataList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CampaignMainRow {...item} navigation={this.props.navigation} />}
      />
    );
  }
}

//

export default createFragmentContainer(campaignMainViewList, graphql`
fragment campaignMainViewList on Query{
  campaigns {
    id
    name
    goal
    total_budget
    status
  }
}
`);