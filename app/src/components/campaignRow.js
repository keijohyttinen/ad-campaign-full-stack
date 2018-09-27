import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

/*import {
  createFragmentContainer,
  graphql
} from 'react-relay';*/

class CampaignRow extends Component {
  render() {
    console.log("CampaignRow", this.props);
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity style={styles.row}
        onPress={() => navigate('Campaigns', { ...this.props })}>
        <View>
          <Text>
            {this.props.name}
          </Text>
        </View>
        <View style={styles.spaceView}>
        </View>
        <View style={styles.nextIcon}>
          <Text>
            ->
            </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default CampaignRow;

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