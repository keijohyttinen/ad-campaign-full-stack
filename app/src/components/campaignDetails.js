import React, { Component } from 'react'

import {
  Dimensions,
  StyleSheet
} from 'react-native';

import {
  QueryRenderer,
  graphql
} from 'react-relay';

import LoadingComponent from './loadingComponent';
import ErrorComponent from './errorComponent';
import CampaignPlatformList from './campaignPlatformList';
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
          ...campaignPlatformList
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
      < QueryRenderer
        environment={environment}
        query={queryCampaignDetails}
        variables={variables}
        render={({ error, props }) => {
          if (error) {
            return <ErrorComponent message={error.message} />
          } else if (props) {
            if (props.campaigns == null || props.campaigns.length !== 1) {
              return <ErrorComponent message={'Error occured in fetching data from the network, please retry'} />
            }
            const data = props.campaigns[0];
            return <CampaignPlatformList data={data.platforms} headerData={data} {...this.props} />
          }
          return <LoadingComponent message='Loading...' />
        }
        }
      />

    )
  }
}


