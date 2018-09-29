import React, { Component } from 'react'

import {
  Dimensions,
  Text,
  View,
  Image,
  FlatList,
  StyleSheet
} from 'react-native';

import {
  createFragmentContainer,
  graphql
} from 'react-relay';

const { width, height } = Dimensions.get('window');

const queryCampaignDetails = graphql`
    query campaignDetailsQuery($id: ID) {
      campaigns(id: $id){
        id
        name
        goal
        total_budget
        platforms {
          ...campaignDetailsPlatformList
        }
      }
    }
`;

export default class CampaignDetails extends Component {
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
      <QueryRenderer
        environment={environment}
        query={queryCampaignDetails}
        variables={campaignData.id}
        render={({ error, props }) => {

          if (error) {
            const msg = `Error occured:\n${error.message}`
            return <LoadingComponent message={msg} />
          } else if (props) {
            return <View>
              <View style={styles.descriptionView}>
                <Text style={styles.title}>{props.goal}</Text>
                <Text style={styles.title}>{props.total_budget}</Text>
                <Text style={styles.description}>{props.status}</Text>
              </View>
            </View>
          }
          return <LoadingComponent message='Loading' />
        }}
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

