import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import core from '../core';

export default function InteractiveList({...props}) {
  return (
    <TouchableOpacity style={styles.item} onPress={props.press}>
      <View style={styles.view}>
        <View>
          <Text style={styles.text}> {props.text}</Text>
        </View>
        <View>
          <Icon
            name="chevron-left"
            size={24}
            color={core.theme.colors.primary}
            style={styles.RightItem}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: core.theme.colors.surface,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
