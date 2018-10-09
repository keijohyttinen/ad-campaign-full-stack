jest.mock('relay-runtime');
import 'react-native';
import React from 'react';
import CampaignDetails from '../src/components/campaignDetails';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

beforeEach(function () {
});

afterEach(function () {
});

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

it('renders CampaignDetails with error', () => {
  const props = {
    name: "Campaing Row prints TestName-2",
    navigation: {
      navigate: () => { },
      state: {
        params: {
          id: 100
        },
      },
    },
  };
  const tree = renderer.create(<CampaignDetails {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
