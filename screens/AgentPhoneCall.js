import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Linking,
  Image,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import core from '../core';
import components from '../components';

export default function AgentPhoneCall({navigation}) {
  const makeCall1 = () => {
    let phoneNumber = `tel:${11111111}`;
    Linking.openURL(phoneNumber);
  };

  const makeCall2 = () => {
    let phoneNumber2 = `tel:${911}`;
    Linking.openURL(phoneNumber2);
  };
  const makeCall3 = () => {
    let phoneNumber3 = `tel:${22222222}`;
    Linking.openURL(phoneNumber3);
  };

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <TouchableOpacity
          style={styles.touchable1}
          onPress={navigation.openDrawer}>
          <FontAwesome
            name="bars"
            size={24}
            color={core.theme.colors.surface}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Emergency Calls</Text>

        <Image style={styles.image} source={core.logonotext} />
      </View>
      <View style={styles.view1}>
        <components.Logo />
      </View>
      <View style={styles.view2}>
        <TouchableOpacity
          onPress={makeCall3}
          activeOpacity={0.7}
          style={styles.touchable2}>
          <Text style={styles.TextStyle}> Administration</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={makeCall1}
          activeOpacity={0.7}
          style={styles.touchable3}>
          <Text style={styles.TextStyle}> Maintenance Service</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={makeCall2}
          activeOpacity={0.7}
          style={styles.touchable4}>
          <Text style={styles.TextStyle}> Police</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: core.theme.colors.surface,
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    marginStart: 90,
    marginTop: 30,
  },
  TextStyle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  view: {
    backgroundColor: core.theme.colors.primary,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    height: 80,
    width: 415,
    flexDirection: 'row',
  },
  touchable1: {
    alignItems: 'flex-start',
    marginTop: 35,
    marginStart: 30,
  },
  text: {
    fontSize: 15,
    marginStart: 100,
    marginTop: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: core.theme.colors.surface,
  },
  view1: {alignSelf: 'center', marginTop: 90},
  view2: {marginTop: 100},
  touchable2: {
    backgroundColor: core.theme.colors.primary,
    borderRadius: 20,
    height: 50,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  touchable3: {
    backgroundColor: core.theme.colors.primary,
    borderRadius: 20,
    height: 50,
    width: 250,
    justifyContent: 'center',
    alignContent: 'center',
  },
  touchable4: {
    backgroundColor: core.theme.colors.primary,
    borderRadius: 20,
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
});
