import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { Spinner, Text, Toast } from 'native-base';
import { Header, Card, ListItem, Button, FormLabel, FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AddButton from './Common/AddButton';

import { getInbox, createTask, acceptTask } from '../Utils/Api';

export default class Inbox extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Inbox',
    tabBarIcon: () => <Icon size={24} name="inbox" color="white" />
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      showModal: false,
      taskTitle: '',
      taskReceiver: '',
      taskDue: '',
      taskDescription: '',
      errMsg: null
    };
  }

  componentDidMount = () => {
    return getInbox(this.props.login)
      .then(response => this.setState({ data: response.data.inbox }));
  }

  showModal = () => this.setState({ showModal: true });

  closeModal = () => this.setState({ showModal: false });

  onTitleChange = (title) => this.setState({ taskTitle: title });

  onReceiverChange = (receiver) => this.setState({ taskReceiver: receiver });

  onDueChange = (due) => this.setState({ taskDue: due });

  onDescriptionChange = (description) => this.setState({ taskDescription: description });

  accept = (item) => {

    let params = JSON.stringify(item);
    return acceptTask(this.props.login, params)
      .then(response => {
        if (response.data.message == 'done') {
          this.componentDidMount();
        }
      });
  };

  create = () => {
    let params = {
      sender: this.props.login,
      title: this.state.taskTitle,
      description: this.state.taskDescription,
      due: this.state.taskDue,
    }
    params = JSON.stringify(params);
    return createTask(this.props.login, this.state.taskReceiver, params)
      .then(response => {
        if (response.data.message == 'done') {
          this.closeModal();
          this.setState({ errMsg: null })
          this.componentDidMount();
        } else if (response.data.message == 'none') {
          this.setState({ errMsg: 'none' });
        }
      });
  };

  render() {
    const data = this.state.data;
    const showModal = this.state.showModal;

    let content = null;
    if (data == null) {
      content = (<Spinner />);
    } else if (data.length == 0) {
      content = (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Text note>Your inbox is empty!</Text>
        </View>
      );
    } else {
      content = (
        data.map((item, index) => (
          <Card key={index}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginRight: 20 }}>
            {item.title}
          </Text>
          <Text
            style={{ marginTop: 10, marginBottom: 10 }}
            fontStyle={'italic'}
          >
            From {item.sender} {item.due}
          </Text>
          <Text style={{ marginBottom: 5 }}>
            {item.description}
          </Text>
          <Button
            backgroundColor='#03A9F4'
            textStyle={{ color: '#00BCD4', fontSize: 16 }}
            buttonStyle={{ backgroundColor: '#fff' }}
            title='ACCEPT'
            onPress={() => this.accept(item)}
          />
          </Card>
        ))
      );
    }
    return (
      <View>
        <Header
          backgroundColor={'#00BCD4'}
          centerComponent={{ text: 'Inbox', style: { color: '#fff', fontSize: 16, fontWeight: 'bold' }}}
          rightComponent={<AddButton func={this.showModal}/>}
        />
        <Modal
          animationType="slide"
          trasparent={false}
          visible={this.state.showModal}
        >
        <View style={{marginTop: 22}}>
          <View style={[styles.card1, { marginLeft: 30, marginRight: 30, marginTop: 90 }]}>
            <FormLabel>Title</FormLabel>
            <FormInput
              onChangeText={this.onTitleChange}
            />
            <FormLabel>Receiver</FormLabel>
            <FormInput
              onChangeText={this.onReceiverChange}
            />
            <FormLabel>Due</FormLabel>
            <FormInput
              placeholder="2018-01-01"
              onChangeText={this.onDueChange}
            />
            <FormLabel>Description</FormLabel>
            <FormInput
              onChangeText={this.onDescriptionChange}
            />
            <Button
              buttonStyle={{ marginTop: 20, backgroundColor: '#00BCD4' }}
              title='ADD'
              onPress={this.create}
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
