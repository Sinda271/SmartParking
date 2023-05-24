import React, {useState, useEffect} from 'react';
import DatePicker from 'react-native-datepicker';
import TimePicker from 'react-native-24h-timepicker';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {Button} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {
  URL,
  DriverCinRoute,
  MakeReservationRoute,
  DriverAllReservationsRoute,
  DeleteReservationRoute,
} from '../core/routes';
import core from '../core';

export default function ModifyReservation({...props}) {
  const index = props.route.params.index;
  const [date, setdate] = useState('');
  const [time, setTime] = useState('');
  const [licencePlate, setLicencePlate] = useState('');
  const [cin, setCin] = useState('');
  const [reservations, setReservations] = useState('');
  const [data, setData] = useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
  });
  const getDriverCin = async () => {
    try {
      axios({
        method: 'get',
        url: URL + DriverCinRoute,
      }).then(response => {
        console.log(response);
        setCin(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onMakeResPressed = async () => {
    try {
      axios({
        method: 'post',
        url: URL + MakeReservationRoute,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          cinRes: cin,
          dateRes: date,
          timeRes: time,
          MatRes: licencePlate,
        },
      }).then(response => {
        console.log(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onCancelTime = () => {
    this.TimePicker.close();
  };

  const onConfirmTime = (hour, minute) => {
    setTime(`${hour}:${minute}`);
    this.TimePicker.close();
  };

  const textInputChange = val => {
    if (val.length === 11) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

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
    getDriverCin();
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
    console.log(key[4]);
    if (key[4] === index) {
      return (
        <Button
          key={key[4]}
          style={styles.modifybutton}
          onPress={() => {
            onDeletePressed();
            onMakeResPressed();

            Alert.alert(
              'Success',
              'Your reservation was modified successfully',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    props.navigation.navigate('DriverHome');
                  },
                },
              ],
            );
          }}>
          <Text style={styles.modifytitle}>Modify Reservation</Text>
        </Button>
      );
    }
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={props.navigation.goBack}>
        <Ionicons
          name="chevron-back"
          size={24}
          color={core.theme.colors.surface}
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.text_header}> Modify Reservation </Text>
      </View>

      <Animatable.View
        style={styles.footer}
        animation="fadeInUpBig"
        useNativeDriver={true}>
        <Text style={styles.text_footer}>Licence Plate:</Text>
        <View style={styles.action}>
          <FontAwesome
            name="car"
            size={20}
            color={core.theme.colors.primary}
            style={styles.icon}
          />
          <TextInput
            placeholder=" e.g. 111 TU 1111"
            placeholderTextColor="grey"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => {
              setLicencePlate(val);
              textInputChange(val);
            }}
          />
          {data.check_textInputChange ? (
            <Feather
              name="check-circle"
              color={core.theme.colors.primary}
              size={20}
            />
          ) : null}
        </View>
        <Text style={[styles.text_footer, styles.margin]}>
          Reservation Date:
        </Text>
        <View style={styles.container1}>
          <DatePicker
            style={styles.datepicker}
            date={date}
            mode="date"
            placeholder="Pick a date"
            placeholderTextColor="#808080"
            format="YYYY-MM-DD"
            minDate="2021-01-01"
            maxDate="2021-12-30"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
                overlayColor: core.theme.colors.primary,
              },
              dateInput: {
                marginLeft: 36,
                borderRadius: 10,
                borderColor: '#A9A9A9',
              },
            }}
            onDateChange={date => {
              setdate(date);
            }}
          />
        </View>
        <Text style={[styles.text_footer, styles.margin]}>Arrival Time:</Text>
        <View style={styles.container1}>
          <View style={styles.timecontainer}>
            <View style={styles.action}>
              <Feather
                name="clock"
                color={core.theme.colors.primary}
                size={30}
                onPress={() => this.TimePicker.open()}
              />

              <Text style={styles.text}>{time}</Text>

              <TimePicker
                ref={ref => {
                  this.TimePicker = ref;
                }}
                onCancel={() => onCancelTime()}
                onConfirm={(hour, minute) => onConfirmTime(hour, minute)}
              />
            </View>
          </View>
        </View>

        <View style={[styles.button, styles.bottom]}>{ResList}</View>
      </Animatable.View>
    </View>
  );
}
const styles = StyleSheet.create({
  timecontainer: {
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    backgroundColor: core.theme.colors.surface,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: core.theme.colors.primary,
  },
  container1: {
    backgroundColor: core.theme.colors.surface,
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
    //paddingVertical:150,
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
    marginTop: 50,
    alignSelf: 'center',
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  text_footer: {
    color: core.theme.colors.secondary,
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 20,
    color: '#000000',
  },
  modifybutton: {
    backgroundColor: core.theme.colors.primary,
    height: 50,
    width: 250,
    borderRadius: 20,
    justifyContent: 'center',
  },
  modifytitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: core.theme.colors.surface,
  },
  touchable: {marginTop: 40, marginStart: 30},
  icon: {paddingBottom: 10, paddingLeft: 10},
  margin: {
    marginTop: 15,
  },
  datepicker: {width: 200, paddingLeft: 10},
  bottom: {marginButtom: 20},
});
