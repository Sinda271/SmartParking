import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView, {Marker} from 'react-native-maps';
import {ChatItem} from 'react-chat-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {Badge} from 'react-native-elements';
import axios from 'axios';
import components from '../components';
import core from '../core';
import {
  URL,
  DriverHomeParkingInfoRoute,
  AdminReplyNotifRoute,
} from '../core/routes';
const MessageIcon = <Icon name="ellipsis1" size={35} color="#3891c0" />;

export default function DriverHome({navigation}) {
  const [isread, setisread] = useState(0);
  const [parkingInfo, setParkingInfo] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [adminReply, setAdminReply] = useState([]);

  const getDriverHomeParkingInfo = async () => {
    try {
      axios({
        method: 'get',
        url: URL + DriverHomeParkingInfoRoute,
      }).then(response => {
        console.log(response);
        setParkingInfo(response);
      });
    } catch (error) {
      console.error(error);
    }
  };
  const getAdminReplyNotif = async () => {
    try {
      axios({
        method: 'get',
        url: URL + AdminReplyNotifRoute,
      }).then(response => {
        console.log(response);
        setAdminReply(response);
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getDriverHomeParkingInfo();
    getAdminReplyNotif();
  }, []);

  const state = {
    longitude: 10,
    latitude: 36,
    latitudeDelta: 33.886917,
    longitudeDelta: 9.537499,
  };

  const handleOpen = () => {
    setAlertVisible(true);
  };
  const handleClose = () => {
    setAlertVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.outertext}>
        {parkingInfo.long} {parkingInfo.lat}
      </Text>
      <MapView
        style={styles.mapview}
        initialRegion={{
          latitudeDelta: state.latitudeDelta,
          longitudeDelta: state.longitudeDelta,
          latitude: state.latitude,
          longitude: state.longitude,
        }}>
        <Marker
          coordinate={{longitude: parkingInfo.lat, latitude: parkingInfo.long}}
          image={core.marker}
          style={styles.marker}
          onPress={() => {
            handleOpen();
          }}
        />
      </MapView>

      <View style={styles.innerview}>
        <TouchableOpacity style={styles.menu} onPress={navigation.openDrawer}>
          <FontAwesome
            name="bars"
            size={24}
            color={core.theme.colors.primary}
          />
        </TouchableOpacity>
        <Text style={styles.bartext}>Home</Text>

        <Image style={styles.image} source={core.logonotext} />
      </View>

      <components.MarkerPopUp
        address={parkingInfo.address}
        freeSpaces={parkingInfo.freeSpaces}
        visible={alertVisible}
        close={() => {
          handleClose();
        }}
        navigation={() => {
          navigation.navigate('DriverReservationM1', {
            itemId: 2,
            latitude: parkingInfo.lat,
            longitude: parkingInfo.long,
          });
          handleClose();
        }}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={[styles.centeredView, styles.view2]}>
          <View style={[styles.modalView, styles.view2]}>
            <View style={styles.Tabcontainer}>
              <ChatItem
                avatar={core.logonotext}
                alt={'Reactjs'}
                subtitle={adminReply.subject}
                title={new Date().toString().substring(0, 15)}
                date={null}
                unread={0}
              />
              <Text style={styles.margin}>{adminReply.reply}</Text>
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setisread(1);
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Hide</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => setModalVisible(true)}>
        {isread === 0 ? (
          <Badge
            value={'+' + isread}
            status="error"
            containerStyle={styles.badge}
          />
        ) : (
          <Badge badgeStyle={styles.badgebg} containerStyle={styles.badge} />
        )}
        {MessageIcon}
      </TouchableOpacity>
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
  panel: {
    padding: 20,
    backgroundColor: core.theme.colors.surface,
    paddingTop: 0,
    height: 300,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    color: core.theme.colors.primary,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: core.theme.colors.primary,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: '100%',
  },
  buttonOpen: {
    backgroundColor: core.theme.colors.primary,
    width: '100%',
  },
  buttonClose: {
    backgroundColor: core.theme.colors.primary,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Tabcontainer: {
    flex: 1,
    width: 350,

    paddingEnd: 40,
    backgroundColor: '#fff',
  },
  outertext: {color: 'transparent'},
  mapview: {flex: 1},
  marker: {width: 10, height: 10},
  innerview: {
    backgroundColor: core.theme.colors.surface,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    height: 80,
    width: 410,
    flexDirection: 'row',
    position: 'absolute',
  },
  menu: {alignItems: 'flex-start', marginTop: 35, marginStart: 30},
  bartext: {
    fontSize: 15,
    marginStart: 133,
    marginTop: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: core.theme.colors.primary,
  },
  view2: {width: '92.5%', height: '70%', alignSelf: 'center'},
  margin: {marginStart: 80, marginTop: 10},
  touchable: {
    borderRadius: 70,
    width: 70,
    height: 70,
    marginTop: 740,
    backgroundColor: core.theme.colors.surface,
    marginStart: 310,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#a9a9a9a',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 80,
    shadowOffset: {width: 1, height: 80},
    position: 'absolute',
  },
  badge: {position: 'absolute', top: -4, right: -4},
  badgebg: {backgroundColor: 'transparent'},
});
