import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import core from '../core';

export default function About({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={navigation.openDrawer}>
          <Icon name="bars" size={24} color={core.theme.colors.primary} />
        </TouchableOpacity>

        <Text style={styles.text}>About</Text>

        <Image style={styles.image} source={core.logonotext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: core.theme.colors.surface,
  },
  image: {
    width: 30,
    height: 30,
    marginStart: 130,
    marginTop: 30,
  },
  view: {
    backgroundColor: core.theme.colors.surface,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    height: 80,
    width: 410,
    flexDirection: 'row',
    position: 'absolute',
    shadowColor: 'a9a9a9',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  touchable: {
    alignItems: 'flex-start',
    marginTop: 35,
    marginStart: 30,
  },
  text: {
    fontSize: 15,
    marginStart: 133,
    marginTop: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: core.theme.colors.primary,
  },
});
