
import React, { Component } from 'react';

import {
  QueryRenderer,
  graphql
} from 'react-relay';

import { createStackNavigator } from 'react-navigation'

import { environment } from '../relayEnvironment';
import LoadingComponent from '../components/loadingComponent';
import ErrorComponent from '../components/errorComponent';
import CampaignMainView from '../components/campaignMainViewList';
import CampaignDetails from '../components/campaignDetails';
import CampaignPlatformDetails from '../components/campaignPlatformDetails';

const campaignQuery = graphql`
  query mainQuery{ 
      ...campaignMainViewList
  }
`

class Main extends Component {
  static navigationOptions = {
    headerTitle: 'Ad campaign app',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#007ACC',
      marginTop: 24
    }
  }
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={campaignQuery}
        render={({ error, props, retry }) => {
          if (error) {
            return <ErrorComponent message={error.message} retry={retry} />
          } else if (props) {
            return <CampaignMainView data={props} {...this.props} />
          }
          return <LoadingComponent message='Loading...' />
        }}
      />
    );
  }
}

const Nav = createStackNavigator({
  Home: { screen: Main },
  CampaignDetails: { screen: CampaignDetails },
  CampaignPlatformDetails: { screen: CampaignPlatformDetails },
});

export default Nav;
