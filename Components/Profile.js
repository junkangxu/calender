import React from 'react';
import { View, Image, Text } from 'react-native';
import { Spinner } from 'native-base';
import { Header, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { getProfile } from '../Utils/Api';

export default class Profile extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: () => <Icon size={24} name="date-range" color="white" />
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount = () => {
    return getProfile(this.props.login)
      .then(response => this.setState({ data: response.data }));
  }

  render() {
    const data = this.state.data;

    if (data == null) {
      return (<Spinner />);
    }
    return (
      <View>
        <Header
          backgroundColor={'#00BCD4'}
          centerComponent={{ text: 'Profile', style: { color: '#fff', fontSize: 16, fontWeight: 'bold' }}}
        />
        <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Image
            style={{width: 100, height: 100}}
            source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
          />
          <View style={{ marginTop: 20, marginLeft: 40 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 36 }}>{data.name}</Text>
          <Text note style={{ fontSize: 24 }}>@{data.username}</Text>
          </View>
        </View>
        <Button
          title='LOG OUT'
          titleStyle={{ fontWeight: 'bold' }}
          buttonStyle={{ backgroundColor: "#00BCD4" }}
          onPress={this.props.logoutFuc}
        />
      </View>
    )
  }
}
