import 'react-native';
import React from 'react';
import CampaignDetails from '../src/components/campaignDetails';

import renderer from 'react-test-renderer';

describe('CampaignDetails test', () => {
  it('renders CampaignDetails correctly', () => {
    const props = {
      name: "Campaing Row prints TestName-2",
      navigation: {
        navigate: () => { },
        state: {
          name: "Name1",
          params: {
            id: 100000001
          },
        },
      },
    };
    const tree = renderer.create(<CampaignDetails {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
