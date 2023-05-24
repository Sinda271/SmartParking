import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import core from '../core';

export default function SplashScreen({navigation}) {
  setTimeout(() => {
    navigation.navigate('StartScreen');
  }, 3000);
  return (
    <View style={styles.container} behavior="padding">
      <View>
        <Image source={core.logo} style={styles.image} />
      </View>
      <View>
        <Text style={styles.text}>Powered By</Text>
        <Image source={core.logonotext} style={styles.talan} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginTop: 300,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: core.theme.colors.surface,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 10,
    lineHeight: 26,
    textAlign: 'center',
    marginTop: 200,
  },
  talan: {
    width: 50,
    height: 30,
    alignSelf: 'center',
  },
});
