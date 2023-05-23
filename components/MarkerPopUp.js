import React from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import {Title, IconButton} from 'react-native-paper';
import {Button} from 'native-base';
import core from '../core';

export default function MarkerPopUp({
  address,
  freeSpaces,
  visible,
  close,
  navigation,
}) {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.topview}>
              <Title style={styles.title}>Description</Title>
              <IconButton
                icon="close"
                color={core.theme.colors.primary}
                style={styles.icon}
                size={20}
                onPress={close}
              />
            </View>

            <View style={styles.view}>
              <Text style={styles.viewtext}>Free Spaces: </Text>
              <Text>{freeSpaces}</Text>
            </View>

            <View style={styles.view}>
              <Text style={styles.viewtext}>Address: </Text>
              <Text>{address}</Text>
            </View>
            <Button style={styles.button} onPress={navigation}>
              <Text style={styles.buttontext}>Make Reservation</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalView: {
    width: '80%',
    margin: 10,
    backgroundColor: core.theme.colors.surface,
    borderRadius: 20,
    paddingStart: 15,
    paddingBottom: 15,
    shadowColor: core.theme.colors.error,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.05,
    elevation: 5,
  },
  button: {
    backgroundColor: core.theme.colors.primary,
    padding: 10,
    borderRadius: 10,
    marginStart: 80,
    marginTop: 15,
  },
  buttontext: {
    fontWeight: 'bold',
    color: core.theme.colors.surface,
  },
  view: {
    marginStart: 20,
    flexDirection: 'row',
  },
  viewtext: {
    fontWeight: 'bold',
  },
  icon: {
    marginStart: 160,
  },
  title: {
    color: core.theme.colors.primary,
    marginTop: 15,
  },
  topview: {
    flexDirection: 'row',
  },
});
