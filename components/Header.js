import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import core from '../core';

export default function Header(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: core.theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
