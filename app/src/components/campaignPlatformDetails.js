import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';

import {
  createFragmentContainer,
  graphql
} from 'react-relay';

import { Card, Tile } from 'react-native-elements'
import _ from 'underscore';
import { getUri } from '../util/imageUtil'
import { toViewParams } from '../util/viewUtil'

const { width, height } = Dimensions.get('window');

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
    this.toViewParams = toViewParams.bind(this);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const platformData = this.props.navigation.state.params.data;
    let audienceParamMap = this.toViewParams({
      "Languages": platformData.target_audiance.languages,
      "Genders": platformData.target_audiance.genders,
      "Age Range": platformData.target_audiance.age_range.join(" - "),
      "Locations": platformData.target_audiance.locations,
      "Interests": platformData.target_audiance.interests,
    });

    let insightsParams = this.toViewParams({
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
          <Tile
            imageSrc={{ uri: getUri(platformData.creatives.image) }}
            imageContainerStyle={styles.image}
            title={platformData.creatives.header}
            titleStyle={styles.title}
            contentContainerStyle={styles.descriptionView}
          >
            <View
              style={styles.description}
            >
              <Text>{platformData.creatives.description}</Text>
              <Text style={styles.link}>{platformData.creatives.url}</Text>
            </View>
          </Tile>
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

const styles = StyleSheet.create({
  image: {
    width: width / 1.2,
    height: width / 4,
    borderRadius: width / 8,
  },
  descriptionView: {
    flex: 1,
    width: width / 1.2,
    marginBottom: 10
  },
  title: {
    fontSize: 16,
    width: width / 1.2,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  description: {
    fontSize: 12,
    width: width / 1.4,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  link: {
    color: 'blue',
  }
})