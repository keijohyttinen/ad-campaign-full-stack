import React, { Component } from 'react'

import {
  Dimensions,
  Text,
  View,
  Image,
  FlatList,
  StyleSheet
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class CampaignAlbums extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: `${navigation.state.params.name}`,
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#007ACC',
      marginTop: 24
    }
  });
  render() {
    const campaignData = this.props.navigation.state.params;

    return (
      <FlatList
        style={styles.container}
        data={campaignData}
        //keyExtractor={(item, index) => item.node.key}
        renderItem={({ item }) =>
          <View style={styles.row}>
            <View style={styles.descriptionView}>
              <Text style={styles.title}>{item.goal}</Text>
              <Text style={styles.description}>{item.status}</Text>
            </View>
          </View>
        }
      />
    )
  }
}

/*<Image style={styles.image}
  source={{ uri: item.node.coverUrl }}
/>*/

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
    flexDirection: 'column',
    padding: 10
  },
  title: {
    fontSize: 16
  },
  description: {
    fontSize: 12
  }
})

