import 'react-native';
import React from 'react';
import CampaignMainRow from '../src/components/campaignMainRow';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders CampaignMainRow correctly', () => {
  const props = {
    name: "Campaing Row prints TestName-2",

  };
  const navigation = {
    navigate: () => { }
  }
  const tree = renderer.create(<CampaignMainRow {...props} navigation={navigation} />).toJSON();
  expect(tree).toMatchSnapshot();
});
