import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import core from '../core';
import {URL, MakePaymentRoute} from '../core/routes';

export default function DriverPayment({...props}) {
  const paymentInfo = props.route.params.pay;
  console.log(paymentInfo);

  const reservationDate = paymentInfo.date;
  const reservationTime = paymentInfo.time;
  const today = new Date().getTime();
  const thisDay = new Date();

  const reservation = new Date(
    reservationDate + 'T' + reservationTime + ':00.284Z',
  ).getTime();

  const durHours = Math.floor((today - reservation) / 3600000);
  const durMins = Math.floor((((today - reservation) / 3600000) % 1) * 60);
  console.log(durMins);
  const cartInfo = {
    clientId: paymentInfo.id,
    lp: paymentInfo.licencePlate,
    duration: durHours + ':' + durMins,
    amount: parseFloat(((today - reservation) / 3600000).toPrecision(4)),
  };
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const onPaySuccess = async () => {
    try {
      axios({
        method: 'post',
        url: URL + MakePaymentRoute,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          cinPay: paymentInfo.id,
          datePay: thisDay,
          AmountPay: cartInfo.amount,
          resId: paymentInfo.reserId,
        },
      }).then(response => {
        console.log(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onPayment = async () => {
    const paymeeToken = axios({
      method: 'post',
      baseURL: 'https://sandbox.paymee.tn/api/v1/payments/create',
      headers: {
        Authorization: 'Token 790ad052bbaf3d06f9c8e17697f1fe404b5b3d10',
        'Content-Type': 'application/json',
      },
      data: {
        vendor: 1752,
        amount: cartInfo.amount,
        note: 'Order #1000132',
      },
    });
    console.log((await paymeeToken).data.data.token);

    const url =
      'https://sandbox.paymee.tn/gateway/' +
      (await paymeeToken).data.data.token;
    const geturl =
      'https://sandbox.paymee.tn/api/v1/payments/' +
      (await paymeeToken).data.data.token +
      '/check';

    try {
      await Linking.openURL(url);
      await sleep(1000);
      await axios({
        method: 'get',
        baseURL: geturl,
        headers: {
          Authorization: 'Token 790ad052bbaf3d06f9c8e17697f1fe404b5b3d10',
          'Content-Type': 'application/json',
        },
      }).then(response => {
        console.log(response.data);
        if (response.data.data.payment_status === true) {
          Alert.alert(
            'Success',
            'Your payment has been carried successfully, press ok to continue.',
            [
              {
                text: 'OK',
                onPress: () => {
                  onPaySuccess();
                  props.navigation.navigate('FidelityPts');
                },
              },
            ],
          );
        } else {
          Alert.alert(
            'Oops!!',
            'Something went wrong during the payment process.',
            [
              {
                text: 'OK',
                onPress: () => props.navigation.navigate('DriverPayment'),
              },
            ],
          );
        }
      });
    } catch (error) {
      Alert.alert('Something went wrong during the payment process');
    }
  };

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

      <Text style={styles.paytext}> Make Payment </Text>

      <View style={styles.view}>
        <Text style={styles.text1}>Client: </Text>
        <Text style={styles.text2}>{cartInfo.clientId} </Text>
      </View>

      <View style={styles.view}>
        <Text style={styles.text1}>Licence Plate: </Text>
        <Text style={styles.text2}>{cartInfo.lp} </Text>
      </View>

      <View style={styles.view}>
        <Text style={styles.text1}>Parking Duration: </Text>
        <Text style={styles.text2}>{cartInfo.duration} </Text>
      </View>

      <View style={styles.view}>
        <Text style={styles.text1}>Payable Amount: </Text>
        <Text style={styles.text2}>{cartInfo.amount} </Text>
      </View>

      <TouchableOpacity
        style={styles.touchable1}
        onPress={() => {
          onPayment();
        }}>
        <Text style={styles.proceed}>Proceed To Pay</Text>
      </TouchableOpacity>
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
    marginStart: 120,
    marginTop: 30,
  },
  touchable: {
    borderRadius: 50,
    width: 50,
    height: 50,
    marginTop: 50,
    backgroundColor: core.theme.colors.primary,
    alignSelf: 'flex-start',
    marginStart: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paytext: {
    fontSize: 25,
    marginTop: 200,
    color: core.theme.colors.secondary,
    fontWeight: 'bold',
  },
  view: {alignSelf: 'center', flexDirection: 'row', marginTop: 20},
  text1: {fontSize: 16, fontWeight: 'bold'},
  text2: {fontSize: 16},
  touchable1: {
    height: 60,
    width: 200,
    backgroundColor: core.theme.colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  proceed: {
    color: core.theme.colors.surface,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
