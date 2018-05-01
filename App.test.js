import React from 'react';

import Inbox from './Components/Inbox';
import Calendars from './Components/Calendars';
import Contacts from './Components/Contacts';
import Profile from './Components/Profile';
import Login from './Components/Login';
import Register from './Components/Register';

import renderer from 'react-test-renderer';

test('Inbox page renders correctly', () => {
  const tree = renderer.create(<Inbox />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Calendars page renders correctly', () => {
  const tree = renderer.create(<Calendars />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Contacts page renders correctly', () => {
  const tree = renderer.create(<Inbox />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Profile page renders correctly', () => {
  const tree = renderer.create(<Profile />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Login page renders correctly', () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Register page renders correctly', () => {
  const tree = renderer.create(<Register />).toJSON();
  expect(tree).toMatchSnapshot();
});
