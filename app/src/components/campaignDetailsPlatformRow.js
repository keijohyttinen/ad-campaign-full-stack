import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

/* schema:
type Platform {
    status: Status!
    total_budget: Int!
    remaining_budget: Int!
    start_date: Int!
    end_date: Int!
    target_audiance: TargetAudience
    creatives: Creatives
    insights: Insights
}

 type TargetAudience {
    languages:[String!]
    genders:[String!]
    age_range:[Int!]
    locations:[String!]
    interests:[String!]
}

type Creatives {
    header:String!
    description:String!
    url:String!
    image:String!
}

type Insights {
    impressions: Int!
    clicks: Int!
    nanos_score: Float!
    cost_per_click: Float!
    click_through_rate: Float!
    advanced_kpi_1: Float!
    advanced_kpi_2: Float!
}   
*/

class campaignDetailsPlatformRow extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 100,
          padding: 20,
        }}>
        <View>
          <Text>
            {`Status: ${this.props.status}`}
          </Text>
          <Text>
            {`Remaining Budget: ${this.props.remaining_budget}`}
          </Text>
        </View>
      </View>
    )
  }
}

export default createFragmentContainer(campaignDetailsPlatformRow, graphql`
fragment campaignDetailsPlatformRow on Platform{
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