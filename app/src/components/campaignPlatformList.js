import React, { Component } from 'react';

import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Picker
} from 'react-native';


import {
  createFragmentContainer,
  graphql
} from 'react-relay';

import _ from 'underscore';
import CampaignPlatform from './campaignPlatform';
import { toViewParams } from '../util/viewUtil'
import { currencyFormat } from '../util/currencyUtil'

class campaignPlatformList extends Component {

  constructor(props) {
    super(props);
    this.state = { text: 'TODO: support field editing' };
    this.toViewParams = toViewParams.bind(this);
  }

  renderHeader(data) {
    return () => {
      return (<View>
        <View style={styles.container}>
          <Text style={styles.title}>{data.name}</Text>
        </View>
        <View style={styles.descriptionView}>
          {this.toViewParams({
            "Goal": data.goal,
            "Total budget": currencyFormat(data.total_budget),
            "Status": data.status
          })}
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
      .filter((key) => !key.includes('_') && this.props.data[key] != null)
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
    padding: 5
  },
  descriptionView: {
    flexDirection: 'column',
    margin: 20
  },
  title: {
    fontSize: 18,
    padding: 10
  },
  description: {
    fontSize: 12
  }
})