import React from 'react';
import { View, Modal, TouchableHighlight, StyleSheet } from 'react-native';
import { Spinner, Text } from 'native-base';
import { Header, Card, Input, ListItem, FormLabel, FormInput, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import AddButton from './Common/AddButton';

import { getContacts, addContact } from '../Utils/Api';

export default class Contacts extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Contacts',
    tabBarIcon: () => <Ionicons size={24} name="date-range" color="white" />
  }

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      data: null,
      showModal: false,
      errMsg: null
    }
  }

  componentDidMount = () => {
    return getContacts(this.props.login)
      .then(response => this.setState({ data: response.data.contacts }));
  }

  showModal = () => this.setState({ showModal: true });

  closeModal = () => this.setState({ showModal: false });

  onSearchChange = (text) => this.setState({ searchText: text });

  add = () => {
    return addContact(this.props.login, this.state.searchText.toLowerCase())
      .then(response => {
        if (response.data.message == 'done') {
          this.closeModal();
          this.setState({ errMsg: null })
          this.componentDidMount();
        } else if (response.data.message == 'none') {
          this.setState({ errMsg: 'none' });
        } else if (response.data.message == 'exist') {
          this.setState({ errMsg: 'exist' });
        }
      });
  }

  render() {
    const data = this.state.data;
    const errMsg = this.state.errMsg;

    let content = null;
    if (data == null) {
      content = (<Spinner />);
    } else if (data.length == 0) {
      content = (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Text note>You have no contacts!</Text>
        </View>
      );
    } else {
      content = (
        <View>
          {data.map((item, index) => (
            <ListItem
              leftAvatar={{ rounded: true, source: { uri: '' } }}
              title={item.name}
              titleStyle={{ fontWeight: 'bold' }}
              onPress={() => console.log('press!')}
              subtitle={item.username}
              chevron
            />
          ))}
        </View>);
    }

    let errMessage = null;
    if (errMsg == 'none') {
      errMessage = (<Text style={{textAlign: 'center', color: 'red' }}>Contact does not exist</Text>);
    } else if (errMsg == 'exist') {
      errMessage = (<Text style={{textAlign: 'center', color: 'red' }}>Contact is already in your contacts list</Text>);
    }

    return (
      <View>
        <Header
          backgroundColor={'#00BCD4'}
          centerComponent={{ text: 'Contacts', style: { color: '#fff', fontSize: 16, fontWeight: 'bold' }}}
          rightComponent={<AddButton func={this.showModal}/>}
        />
        <Modal
          animationType="fade"
          trasparent={false}
          visible={this.state.showModal}
        >
        <View style={{marginTop: 22}}>
          <View style={[styles.card1, { marginLeft: 30, marginRight: 30, marginTop: 90 }]}>
            <FormLabel>Username</FormLabel>
            <FormInput onChangeText={this.onSearchChange}/>
            {errMessage}
            <Button
              buttonStyle={{ marginTop: 20, backgroundColor: '#00BCD4' }}
              title='ADD'
              onPress={this.add}
            />
            <Button
              buttonStyle={{ marginTop: 20, backgroundColor: '#00BCD4' }}
              title='CLOSE'
              onPress={this.closeModal}
            />
          </View>
        </View>
        </Modal>
        {content}
      </View>
    )
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
