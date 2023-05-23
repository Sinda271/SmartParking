import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {TextInput} from 'react-native-paper';
import axios from 'axios';
import core from '../core';
import helpers from '../helpers';
import components from '../components';
import {URL, addParkingRoute} from '../core/routes';

export default function AddParking({navigation}) {
  const [idParking, setIdParking] = useState({value: '', error: ''});
  const [longitude, setLongitude] = useState({value: '', error: ''});
  const [latitude, setLatitude] = useState({value: '', error: ''});
  const [address, setAddress] = useState({value: '', error: ''});

  const onAddParkingPressed = () => {
    const idParkingError = helpers.nameValidator(idParking.value);
    const longitudeError = helpers.nameValidator(longitude.value);
    const latitudeError = helpers.nameValidator(latitude.value);
    const addressError = helpers.nameValidator(address.value);

    if (idParkingError || longitudeError || latitudeError || addressError) {
      setIdParking({...idParking, error: idParkingError});
      setLongitude({...longitude, error: longitudeError});
      setLatitude({...latitude, error: latitudeError});
      setAddress({...address, error: addressError});

      return;
    }
    axios({
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      url: URL + addParkingRoute,
      data: {
        idParking: idParking.value,
        long: longitude.value,
        lat: latitude.value,
        addr: address.value,
      },
    }).then(response => {
      Alert.alert('Success', response, [
        {
          text: 'OK',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{name: 'AddParking'}],
            });
          },
        },
      ]);
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageLayout}
        onPress={() => navigation.navigate('ManageParkings')}>
        <Image style={styles.image} source={core.backarrow} />
      </TouchableOpacity>

      <View style={styles.logoview}>
        <components.Logo />
      </View>

      <ScrollView style={styles.scrollView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'padding' : null}>
          <TextInput
            style={styles.inputtext}
            label="Parking ID"
            returnKeyType="next"
            mode="outlined"
            value={idParking.value}
            onChangeText={text => setIdParking({value: text, error: ''})}
            error={!!idParking.error}
            errorText={idParking.error}
          />
          <TextInput
            style={styles.inputtext}
            label="Longitude"
            returnKeyType="next"
            mode="outlined"
            value={longitude.value}
            onChangeText={text => setLongitude({value: text, error: ''})}
            error={!!longitude.error}
            errorText={longitude.error}
          />
          <TextInput
            style={styles.inputtext}
            mode="outlined"
            label="Latitude"
            returnKeyType="next"
            value={latitude.value}
            onChangeText={text => setLatitude({value: text, error: ''})}
            error={!!latitude.error}
            errorText={latitude.error}
          />
          <TextInput
            style={styles.inputtext}
            mode="outlined"
            label="Address"
            returnKeyType="next"
            value={address.value}
            onChangeText={text => setAddress({value: text, error: ''})}
            error={!!address.error}
            errorText={address.error}
          />

          <components.Button
            mode="contained"
            onPress={onAddParkingPressed}
            style={styles.button}>
            Add Parking
          </components.Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: core.theme.colors.surface,
  },
  imageLayout: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
    marginStart: 30,
  },
  image: {
    width: 24,
    height: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    marginStart: 90,
  },
  link: {
    fontWeight: 'bold',
    color: core.theme.colors.primary,
  },
  scrollView: {
    backgroundColor: core.theme.colors.surface,
  },
  logoview: {
    alignSelf: 'center',
    marginTop: 60,
  },
  inputtext: {
    backgroundColor: core.theme.colors.surface,
    marginRight: 60,
    marginLeft: 60,
  },
  button: {
    marginTop: 24,
    width: 200,
    marginStart: 100,
  },
});
