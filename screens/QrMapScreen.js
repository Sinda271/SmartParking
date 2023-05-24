import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import core from '../core';
import {URL, ReservationLongLatRoute} from '../core/routes';
export default function QrMapScreen({...props}) {
  const [state, setState] = useState({longitude: 0, latitude: 0, error: null});
  const [marker, setmarker] = useState({longitude: 0, latitude: 0});
  const date = props.route.params.date;
  const time = props.route.params.time;
  const mat = props.route.params.mat;
  const cin = props.route.params.cin;
  const resId = props.route.params.resId;

  useEffect(() => {
    try {
      axios({
        method: 'post',
        url: URL + ReservationLongLatRoute,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          idReser: props.route.params.resId,
        },
      }).then(response => {
        console.log(response);
        setmarker({longitude: response.longitude, latitude: response.latitude});
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          error: null,
        });
      },
      error => setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 2000},
    );
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: state.latitude,
          longitude: state.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}>
        <Marker coordinate={state} />
        <Marker coordinate={marker} image={core.marker} />
        <MapViewDirections
          origin={state}
          destination={marker}
          apikey="AIzaSyCPNM9bHIirW_SbaLZpSbSeuWzipJwgHlo"
          strokeWidth={3}
          strokeColor={core.theme.colors.error}
        />
      </MapView>
      <TouchableOpacity
        style={styles.touchable1}
        onPress={() => props.navigation.navigate('DriverHome')}>
        <Ionicons
          name="chevron-back"
          size={24}
          color={core.theme.colors.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchable2}
        onPress={() =>
          props.navigation.navigate('Qrcode', {
            itemId: 4,
            date: date,
            time: time,
            mat: mat,
            cin: cin,
            reserId: resId,
          })
        }>
        <FontAwesome
          name="qrcode"
          size={35}
          color={core.theme.colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {...StyleSheet.absoluteFillObject},
  map: {...StyleSheet.absoluteFillObject},
  button: {
    backgroundColor: core.theme.colors.primary,
  },
  touchable1: {
    borderRadius: 50,
    width: 50,
    height: 50,
    marginTop: 50,
    backgroundColor: core.theme.colors.surface,
    alignSelf: 'flex-start',
    marginStart: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable2: {
    borderRadius: 70,
    width: 70,
    height: 70,
    marginTop: 650,
    backgroundColor: core.theme.colors.surface,
    alignSelf: 'flex-end',
    marginEnd: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
