import 'react-native';
import React from 'react';
import Main from '../src/view/main';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders MainView correctly', () => {
  const tree = renderer.create(<Main />).toJSON();
  expect(tree).toMatchSnapshot();
});

