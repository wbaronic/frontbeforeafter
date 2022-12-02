import { render, screen,fireEvent  } from '@testing-library/react';
import App from './App';
import  TestRenderer  from  'react-test-renderer';
import  AddCar  from  './components/AddCar';

test('renders a snapshot', () => {
  const tree = TestRenderer.create
      (<AddCar/>).toJSON();
  expect(tree).toMatchSnapshot();
});
