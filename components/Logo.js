import React from 'react';
import {Image, StyleSheet} from 'react-native';
import core from '../core';
export default function Logo() {
  return <Image source={core.logo} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 8,
  },
});
