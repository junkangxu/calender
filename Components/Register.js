import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import { getRegister } from '../Utils/Api';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      username: null,
      password: null,
      confirmPassword: null
    };
  }

  onNameChange = (name) => this.setState({ name: name });

  onUsernameChange = (username) => this.setState({ username: username });

  onPasswordChange = (password) => this.setState({ password: password });

  onConfirmPasswordChange = (confirmPassword) => this.setState({ confirmPassword: confirmPassword });

  register = (name, username, password, confirmPassword) => {
    if (password != confirmPassword) {
      alert('Passwords do not match');
      return 0;
    }
    return getRegister(username.toLowerCase(), password, name)
      .then(response => {
        if (response.data.username == '') {
          alert('Username already in use');
        } else {
          this.props.login(response.data.username);
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const {
      name, username, password, confirmPassword
    } = this.state;

    return (
      <View style={[styles.card1, { marginLeft: 30, marginRight: 30, marginTop: 90 }]}>
        <FormLabel>Name</FormLabel>
        <FormInput onChangeText={this.onNameChange}/>
        <FormLabel>Username</FormLabel>
        <FormInput onChangeText={this.onUsernameChange}/>
        <FormLabel>Password</FormLabel>
        <FormInput onChangeText={this.onPasswordChange} secureTextEntry={true}/>
        <FormLabel>Confirm Password</FormLabel>
        <FormInput onChangeText={this.onConfirmPasswordChange} secureTextEntry={true}/>
        <Button
          buttonStyle={{ marginTop: 20, backgroundColor: '#00BCD4' }}
          title='Register'
          onPress={() => this.register(name, username, password, confirmPassword)}
        />
        <Button
          buttonStyle={{ backgroundColor: '#FFF', marginTop: 10 }}
          title='Back to Login page'
          color={'#00BCD4'}
          onPress={this.props.goBack}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card1: {
    paddingVertical: 16,
  },
  title: {
    paddingBottom: 40,
    textAlign: 'center',
    color: '#00BCD4',
    fontWeight: 'bold',
    opacity: 0.8,
  }
});
