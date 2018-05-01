import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native'
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import { TabNavigator } from 'react-navigation'
import { Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
// import Icon from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios';

import Login from './Components/Login';
import Inbox from './Components/Inbox';
import Calendars from './Components/Calendars';
import Contacts from './Components/Contacts';
import Profile from './Components/Profile';

import { getLogin, getRegister } from './Utils/Api';

/**
 * react-navigation's TabNavigator.
 */
 class Dashboard extends Component {
   constructor(props) {
     super(props);
     this.state = {
       tab: 0
     }
   }

   handleTabChange = (newIndex, oldIndex) => this.setState({ tab: newIndex });

   render() {
     console.disableYellowBox = true;
     const tab = this.state.tab;
     let content = null;
     if (tab == 0) {
       content = (<Inbox login={this.props.login} />);
     } else if (tab == 1) {
       content = (<Calendars login={this.props.login} />);
     } else if (tab == 2) {
       content = (<Contacts login={this.props.login} />);
     } else if (tab == 3) {
       content = (<Profile login={this.props.login} logoutFuc={this.props.logoutFuc} />);
     }

     return (
       <View style={{ flex: 1 }}>
       { content }
       <BottomNavigation
       activeTab={this.state.tab}
        labelColor="white"
         rippleColor="white"
         style={{
           height: 56,
           elevation: 8,
           position: 'absolute',
           left: 0,
           bottom: 0,
           right: 0
         }}
         onTabChange={this.handleTabChange}
       >
         <Tab
           barBackgroundColor="#00BCD4"
           label="Inbox"
           icon={<Ionicons size={24} color="white" name="ios-mail-outline" />}
         />
         <Tab
           barBackgroundColor="#00BCD4"
           label="Calendar"
           icon={<Ionicons size={24} color="white" name="md-calendar" />}
         />
         <Tab
           barBackgroundColor="#00BCD4"
           label="Contacts"
           icon={<Ionicons size={24} color="white" name="ios-contacts-outline" />}
         />
         <Tab
           barBackgroundColor="#00BCD4"
           label="Profile"
           icon={<Ionicons size={24} color="white" name="ios-person-outline" />}
         />
       </BottomNavigation>
       </View>
     )
   }
 }


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null
    };
  }

  login = (login) => this.setState({ login: login });
  logout = () => this.setState({ login: null });

  render() {
    const login = this.state.login;

    if (login == null) {
      return (
        <Login login={this.login}/>
      );
    } else {
      console.log(login);
      return (
        <Dashboard login={login} logoutFuc={this.logout} />
      );
    }
  }
}
