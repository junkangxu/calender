import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import Register from './Register';
import { getLogin } from '../Utils/Api';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      login: null,
      goRegister: false
    };
  }

  onUsernameChange = (username) => this.setState({ username: username });

  onPasswordChange = (password) => this.setState({ password: password });

  login = (username, password) => {
    return getLogin(username.toLowerCase(), password)
      .then(response => {
        if (response.data == '') {
          alert('Wrong username or password');
        } else {
          this.props.login(response.data.username);
        }
      })
      .catch(err => console.log(err));
  }

  forwardToLogin = () => this.setState({ goRegister: false });

  forwardToRegister = () => this.setState({ goRegister: true });

  render() {
    const {
      username, password, login, goRegister
    } = this.state;

    if (goRegister) {
      return (
        <Register login={this.props.login} goBack={this.forwardToLogin} />
      );
    }

    return (
        <View style={[styles.card1, { marginLeft: 30, marginRight: 30, marginTop: 90 }]}>
          <Ionicons style={styles.title} name="ios-calendar-outline" size={120} color="#00BCD4" />
          <FormLabel>Username</FormLabel>
          <FormInput onChangeText={this.onUsernameChange}/>
          <FormLabel>Password</FormLabel>
          <FormInput onChangeText={this.onPasswordChange} secureTextEntry={true}/>
          <Button
            buttonStyle={{ marginTop: 20, backgroundColor: '#00BCD4' }}
            title='LOGIN'
            onPress={() => this.login(username, password)}
          />
          <Button
            buttonStyle={{ backgroundColor: '#FFF', marginTop: 10 }}
            title='Need an account?'
            color={'#00BCD4'}
            onPress={this.forwardToRegister}
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
