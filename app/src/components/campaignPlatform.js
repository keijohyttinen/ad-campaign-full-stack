import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet
} from 'react-native';

import {
  createFragmentContainer,
  graphql
} from 'react-relay';

import { Card, Button } from 'react-native-elements'
import _ from 'underscore';
import { currencyFormat } from '../util/currencyUtil'
import { toViewParams } from '../util/viewUtil'

class campaignPlatform extends Component {

  constructor(props) {
    super(props);
    this.state = { text: 'TODO: support field editing' };
    this.toViewParams = toViewParams.bind(this);
  }

  render() {
    const { navigate } = this.props.navigation;
    let platformName = this.props.platform;
    let params = this.toViewParams({
      "Status": this.props.data.status,
      "Total budget": currencyFormat(this.props.data.total_budget),
      "Remaining budget": currencyFormat(this.props.data.remaining_budget),
      "Start date": new Date(parseInt(this.props.data.start_date)).toLocaleString(),
      "End date": new Date(parseInt(this.props.data.end_date)).toLocaleString(),
    });
    return (
      <Card
        title={`${platformName}`}>
        {params}
        <Button
          onPress={() => navigate('CampaignPlatformDetails', { ...this.props })}
          icon={{ name: 'open-in-new' }}
          backgroundColor='#03A9F4'
          buttonStyle={{ borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title='View Details' />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 10
  }
});

export default createFragmentContainer(campaignPlatform, graphql`
fragment campaignPlatform on Platform{
    status
    total_budget
    remaining_budget
    start_date
    end_date
    target_audiance {
      languages
      genders
      age_range
      locations
      interests
    }
    creatives {
      header
      description
      url
      image
    }
    insights {
      impressions
      clicks
        nanos_score
        cost_per_click
        click_through_rate
        advanced_kpi_1
        advanced_kpi_2
      }
    }
`);