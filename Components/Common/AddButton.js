import React from 'react';
import { view } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddButton = (props) => {
  return (
    <Ionicons
      name='ios-add'
      size={20}
      onPress={props.func}
    />
  );
}

export default AddButton;
