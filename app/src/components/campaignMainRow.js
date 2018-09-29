import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

class CampaignMainRow extends Component {
  render() {
    console.log("CampaignMainRow", this.props);
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity style={styles.row}
        onPress={() => navigate('CampaignDetails', { ...this.props })}>
        <View>
          <Text>
            {this.props.name}
          </Text>
          <Text>
            {this.props.goal}
          </Text>
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
    height: 60,
  },
  spaceView: {
    flex: 1
  },
  nextIcon: {
    marginRight: 15
  },
})