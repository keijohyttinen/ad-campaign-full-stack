import 'react-native';
import React from 'react';
import LoadingComponent from '../src/components/loadingComponent';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders LoadingComponent correctly', () => {
  const tree = renderer.create(<LoadingComponent message='Loading test' />).toJSON();
  expect(tree).toMatchSnapshot();
});
