import 'react-native';
import React from 'react';
import CampaignRow from '../src/components/campaignRow';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const props = {
    name: "Campaing Row prints TestName-2",

  };
  const navigation = {
    navigate: () => { }
  }
  const tree = renderer.create(<CampaignRow {...props} navigation={navigation} />).toJSON();
  expect(tree).toMatchSnapshot();
});
