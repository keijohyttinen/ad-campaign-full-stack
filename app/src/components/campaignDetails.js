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
  QueryRenderer,
  graphql
} from 'react-relay';

import LoadingComponent from './loadingComponent';
import CampaignDetailsPlatformList from './campaignDetailsPlatformList';
import { environment } from '../relayEnvironment';

const { width, height } = Dimensions.get('window');

const queryCampaignDetails = graphql`
    query campaignDetailsQuery($id: ID) {
      campaigns(id: $id){
        id
        name
        goal
        total_budget
        status
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
    const variables = {
      id: campaignData.id
    };
    return (
      <QueryRenderer
        environment={environment}
        query={queryCampaignDetails}
        variables={variables}
        render={({ error, props }) => {

          if (error) {
            const msg = `Error occured:\n${error.message}`
            return <LoadingComponent message={msg} />
          } else if (props) {
            if (props.campaigns == null || props.campaigns.length !== 1) {
              return <LoadingComponent message={'Error occured in fetching data from server, please retry'} />
            }
            const data = props.campaigns[0];
            return <CampaignDetailsPlatformList data={data.platforms} headerData={data} {...this.props} />
            /*return <View>
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
              <View style={styles.container}>
                <CampaignDetailsPlatformList data={data.platforms} {...this.props} />
              </View>
            </View >*/
          }
          return <LoadingComponent message='Loading...' />
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

