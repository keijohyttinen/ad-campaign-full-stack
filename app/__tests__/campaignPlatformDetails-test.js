import 'react-native';
import React from 'react';
import fs from 'fs';
import CampaignPlatformDetails from '../src/components/campaignPlatformDetails';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders CampaignPlatformDetails correctly', () => {
  let data = JSON.parse(fs.readFileSync('__tests__/resources/data.json'));
  const props = {
    name: "Campaing Row prints TestName-2",
    navigation: {
      navigate: () => { },
      state: {
        name: "Name1",
        params: {
          data: Object.assign({ "platformName": "Facebook" }, data[0].platforms.facebook)
        }
      },
    },
  };
  const tree = renderer.create(<CampaignPlatformDetails {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
