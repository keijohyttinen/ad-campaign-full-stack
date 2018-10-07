import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native';

import {
  createFragmentContainer,
  graphql
} from 'react-relay';

import { Card } from 'react-native-elements'
import _ from 'underscore';

export default class CampaignPlatformDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: `${navigation.state.params.platform}`,
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#007ACC',
      marginTop: 24
    }
  });
  constructor(props) {
    super(props);
    this.state = { text: 'TODO: support field editing' };
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  toViewItems(paramMap) {
    return _.map(paramMap, (value, key) => {
      return (
        <View key={key} style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text style={{ marginBottom: 5 }}>
              {`${key}`}
            </Text>
          </View>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <TextInput
              style={{ marginBottom: 5 }}
              onChangeText={(text) => this.setState({ text })}
              value={value.toString()}
            />
          </View>
        </View>
      );
    });
  }

  render() {
    const platformData = this.props.navigation.state.params.data;
    let audienceParamMap = this.toViewItems({
      "Languages": platformData.target_audiance.languages,
      "Genders": platformData.target_audiance.genders,
      "Age Range": platformData.target_audiance.age_range.join(" - "),
      "Locations": platformData.target_audiance.locations,
      "Interests": platformData.target_audiance.interests,
    });

    let adCreativeParams = this.toViewItems({
      "Header": platformData.creatives.header,
      "Description": platformData.creatives.description,
      "Url": platformData.creatives.url,
      "Image": platformData.creatives.image,
    });

    let insightsParams = this.toViewItems({
      "Impressions": platformData.insights.impressions,
      "Clicks": platformData.insights.clicks,
      "Score": platformData.insights.nanos_score,
      "Cost/Click": platformData.insights.cost_per_click,
      "Click Through Rate": platformData.insights.click_through_rate,
      "Advanced KPI": platformData.insights.advanced_kpi_1,
      "Advanced KPI2": platformData.insights.advanced_kpi_2,
    });

    return (
      <ScrollView>

        <Card
          title={'Your Ad'}>
          {adCreativeParams}
        </Card>
        <Card
          title={'Target Audience'}>
          {audienceParamMap}
        </Card>
        <Card
          title={'Insight'}>
          {insightsParams}
        </Card>
      </ScrollView >
    );
  }
}