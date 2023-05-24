import React, {useState, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import {
  URL,
  DriverAllReservationsRoute,
  DeleteReservationRoute,
} from '../core/routes';
import core from '../core';

export default function DriverReservations({navigation}) {
  const [reservations, setReservations] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const getDriverAllReservations = async () => {
    try {
      axios({
        method: 'get',
        url: URL + DriverAllReservationsRoute,
      }).then(response => {
        console.log(response);
        setReservations(response);
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getDriverAllReservations();
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getDriverAllReservations();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  var ResList = [];
  ResList = reservations.map(key => {
    const onDeletePressed = async () => {
      try {
        axios({
          method: 'post',
          url: URL + DeleteReservationRoute,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          data: {
            resId: key[4],
          },
        }).then(response => {
          console.log(response);
        });
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <View key={key[4]} style={styles.styleButtons}>
        <View style={styles.data}>
          <Text style={styles.dataText}>
            {' '}
            {key[1]} {key[2]}{' '}
          </Text>
          <Text style={styles.dataText}> {key[0]}</Text>
        </View>
        <View style={styles.styleButtons2}>
          {key[3] === 1 ? (
            <TouchableOpacity></TouchableOpacity>
          ) : (
            <View style={styles.flexrow}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('QrMapScreen', {
                    itemId: 3,
                    date: key[1],
                    time: key[2],
                    mat: key[0],
                    resId: key[4],
                    cin: key[5],
                  })
                }
                style={styles.margin}>
                <MaterialIcons
                  name="gps-fixed"
                  size={25}
                  color={core.theme.colors.tertiary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ModifyReservation', {
                    itemId: 1,
                    index: key[4],
                  })
                }>
                <Feather
                  name="edit"
                  color={core.theme.colors.primary}
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onDeletePressed();
                }}>
                <Feather
                  name="trash-2"
                  color={core.theme.colors.error}
                  size={25}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={navigation.openDrawer}>
        <FontAwesome name="bars" size={24} color={core.theme.colors.surface} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.text_header}>My Reservations </Text>
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <ScrollView
          style={styles.scrollcontainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {ResList}
        </ScrollView>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: core.theme.colors.primary,
  },
  container1: {
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  header: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
  },

  title: {
    color: '#0000A0',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },

  text_footer: {
    color: '#05375a',
    fontSize: 15,
    paddingVertical: 20,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },

  textInput: {
    alignSelf: 'stretch',
    color: 'grey',
    padding: 20,
    backgroundColor: core.theme.colors.surface,
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  },

  scrollcontainer: {
    flex: 1,
    marginBottom: 70,
    borderRadius: 30,
    marginTop: 20,
  },
  data: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
  },
  dataText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: core.theme.colors.error,
  },
  dataDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: core.theme.colors.error,
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10,
  },
  dataDeleteText: {
    color: 'white',
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: core.theme.colors.error,
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 3,
    elevation: 2,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
  },
  styleButtons: {
    flex: 1,
    flexDirection: 'row',
  },
  styleButtons2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    borderRadius: 30,
    left: 10,
    width: 10,
    padding: 10,
  },
  flexrow: {flexDirection: 'row'},
  margin: {marginEnd: 10},
  touchable: {alignItems: 'flex-start', marginTop: 35, marginStart: 30},
});
