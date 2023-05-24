import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import core from '../core';
import {URL, PaymentHistoryRoute, TotalLoyaltyPtsRoute} from '../core/routes';
export default function DriverPaymentHistory({navigation}) {
  const [Payments, setPayments] = useState('');
  const [loyaltyPts, setLoyaltyPts] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  const getTotalLoyaltyPts = async () => {
    try {
      axios({
        method: 'get',
        url: URL + TotalLoyaltyPtsRoute,
      }).then(response => {
        console.log(response);
        setLoyaltyPts(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getPaymentHistory = async () => {
    try {
      axios({
        method: 'get',
        url: URL + PaymentHistoryRoute,
      }).then(response => {
        console.log(response);
        setPayments(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalLoyaltyPts();
    getPaymentHistory();
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getTotalLoyaltyPts();
    getPaymentHistory();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  var ResList = [];
  ResList = Payments.map(key => {
    return (
      <View key={key[0]} style={styles.styleButtons}>
        <View style={styles.data}>
          <Text style={styles.dataText}> {key[1].substring(0, 10)} </Text>
          <Text style={styles.dataText}> {key[2]}</Text>
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
        <Text style={styles.text_header}>My Payments </Text>
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <ScrollView
          style={styles.scrollcontainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {ResList}
          <Text style={styles.text1}>
            Total of loyalty points:
            <Text style={styles.text2}> {loyaltyPts}</Text>
          </Text>
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
  text1: {
    fontSize: 20,
    color: core.theme.colors.error,
    alignSelf: 'flex-start',
    marginTop: 50,
    marginStart: 20,
  },
  text2: {
    fontSize: 20,
    color: core.theme.colors.text,
    alignSelf: 'flex-start',
  },
  touchable: {alignItems: 'flex-start', marginTop: 35, marginStart: 30},
});
