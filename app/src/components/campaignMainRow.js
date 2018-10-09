import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { Text } from 'react-native-elements'

class CampaignMainRow extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity style={styles.row}
        onPress={() => navigate('CampaignDetails', { ...this.props })}>
        <View>
          <Text h4>{this.props.name}</Text>
          <Text>{`Goal: ${this.props.goal}`}</Text>
          <Text>{`Budget: ${this.props.total_budget}`}</Text>
          <Text>{`Status: ${this.props.status}`}</Text>
        </View>
        <View style={styles.spaceView}>
        </View>
        <View style={styles.nextIcon}>
          <Text>
            >
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default CampaignMainRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginBottom: 25,
  },
  spaceView: {
    flex: 1
  },
  nextIcon: {
    marginRight: 15
  },
})