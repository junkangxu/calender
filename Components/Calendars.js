import React from 'react';
import { View, Text } from 'react-native';
import { Spinner } from 'native-base';
import { Header, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Calendar } from 'react-native-calendars';

import { getCalendar } from '../Utils/Api';

export default class Calendars extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Calendar',
    tabBarIcon: () => <Icon size={24} name="date-range" color="white" />
  }

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      dateSelected: null,
      dateSelectedTasks: [],
      data: null
    };
  }

  componentDidMount = () => {
    return getCalendar(this.props.login)
      .then(response => this.setState({ data: response.data.calendar }))
  }

  showDetails = (dayString) => this.setState({ dateSelected: dayString });

  getDueDict = (dueDates) => {
    let retVal = {};
    for (let i = 0; i < dueDates.length; i++) {
      if (dueDates[i] in retVal) {
        continue;
      } else {
        retVal[dueDates[i]] = {marked: true};
      }
    }
    return retVal;
  };

  getCalendarOnDate = (date) => {
    let retVal = [];
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].due == date) {
        retVal.push(this.state.data[i]);
      }
    }
    return retVal;
  };

  render() {
    const { modalVisible, dateSelected, data } = this.state;

    let content = null;
    let detailCard = null;
    if (data == null) {
      content = (<Spinner />);
    } else {
      if (dateSelected) {
        let events = this.getCalendarOnDate(dateSelected);
        console.log(events);
        detailCard = (
          <Card title={dateSelected}>
            {events.map((item) => (
              <View>
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
              </View>
            ))}
          </Card>
        );
      }
      let dueDates = data.map(item => item.due);
      let dueDict = this.getDueDict(dueDates);
      content = (
        <View style={{ marginBottom: 20 }}>
          <View>
            <Calendar
              markedDates={dueDict}
              onDayPress={(day) => {
                this.showDetails(day.dateString);
              }}
            />
          </View>
          <View>
            { detailCard }
          </View>
        </View>
      );
    }

    return (
      <View>
        <Header
          backgroundColor={'#00BCD4'}
          centerComponent={{ text: 'Calendar', style: { color: '#fff', fontSize: 16, fontWeight: 'bold' }}}
        />
        { content }
      </View>
    )
  }
}
