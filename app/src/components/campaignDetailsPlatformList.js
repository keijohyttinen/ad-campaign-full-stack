import React, { Component } from 'react';

import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';


import {
  createFragmentContainer,
  graphql
} from 'react-relay';

import _ from 'underscore';

import CampaignDetailsPlatformRow from './campaignDetailsPlatformRow';
const { width, height } = Dimensions.get('window');



class campaignDetailsPlatformList extends Component {
  renderHeader(data) {
    return () => {
      return (<View>
        <View style={styles.container}>
          <Text style={styles.title}>{data.name}</Text>
        </View>
        <View style={{
          flexDirection: 'column',
          height: 100,
          padding: 20,
        }}>
          <Text>{data.goal}</Text>
          <Text>{data.total_budget}</Text>
          <Text>{data.status}</Text>
        </View>
      </View >);
    };
  }
  render() {
    //Convert map to array with keyname as part of item
    const dataList = Object.keys(this.props.data)
      .filter((key) => !key.includes("_") && this.props.data[key] != null)
      .map((key, index) => {
        return {
          id: index.toString(),
          platform: key,
          fragment: this.props.data[key]
        };
      });
    return (
      <FlatList
        style={{ flex: 1 }}
        data={dataList}
        ListHeaderComponent={this.renderHeader(this.props.headerData)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CampaignDetailsPlatformRow data={item.fragment} platform={item.platform} navigation={this.props.navigation} />}
      />
    );
  }
}
//
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
    instagram {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10
  },
  image: {
    width: width / 4,
    height: width / 4,
    borderRadius: width / 8
  },
  descriptionView: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  title: {
    fontSize: 16
  },
  description: {
    fontSize: 12
  }
})