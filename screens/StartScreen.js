import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import components from '../components';
import core from '../core';
export default function StartScreen({navigation}) {
  return (
    <components.Background>
      <View style={styles.outerview}>
        <components.Logo />
        <components.Paragraph>
          Welcome To PARTORRE the future of parking.
        </components.Paragraph>
        <View style={styles.innerview}>
          <components.Button
            mode="contained"
            onPress={() => navigation.navigate('LoginScreen')}>
            Login
          </components.Button>
          <components.Button
            mode="outlined"
            onPress={() => navigation.navigate('DriverSignUp')}>
            Sign Up
          </components.Button>
        </View>
      </View>
      <View>
        <Text style={styles.text}>Powered By</Text>
        <Image source={core.logo} style={styles.talan} />
      </View>
    </components.Background>
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
  },
  text: {
    fontWeight: 'bold',
    fontSize: 10,
    lineHeight: 26,
    textAlign: 'center',
    marginTop: 50,
  },
  talan: {
    width: 50,
    height: 30,
    alignSelf: 'center',
  },
  outerview: {width: '100%', marginTop: 50, alignItems: 'center'},
  innerview: {width: '100%', paddingTop: 60, alignItems: 'center'},
});
