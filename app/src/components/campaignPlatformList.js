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

import CampaignPlatform from './campaignPlatform';
const { width, height } = Dimensions.get('window');

class campaignPlatformList extends Component {
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
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  render() {
    //Convert map to array with keyname as part of item
    const dataList = Object.keys(this.props.data)
      .filter((key) => !key.includes("_") && this.props.data[key] != null)
      .map((key, index) => {
        return {
          id: index.toString(),
          platform: this.capitalizeFirstLetter(key),
          fragment: this.props.data[key]
        };
      });
    return (
      <FlatList
        style={{ flex: 1 }}
        data={dataList}
        ListHeaderComponent={this.renderHeader(this.props.headerData)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CampaignPlatform data={item.fragment} platform={item.platform} navigation={this.props.navigation} />}
      />
    );
  }
}

export default createFragmentContainer(campaignPlatformList, graphql`
fragment campaignPlatformList on Platforms{
    facebook {
      ...campaignPlatform
    }
    instagram {
      ...campaignPlatform
    }
    google {
      ...campaignPlatform
    }
    adwords{ 
      ...campaignPlatform
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