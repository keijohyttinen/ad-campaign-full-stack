import 'react-native';
import React from 'react';
import ErrorComponent from '../src/components/errorComponent';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders ErrorComponent correctly', () => {
  const tree = renderer.create(<ErrorComponent message='Loading test' />).toJSON();
  expect(tree).toMatchSnapshot();
});
