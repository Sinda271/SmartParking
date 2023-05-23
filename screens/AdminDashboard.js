import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import {Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import core from '../core';
import {
  URL,
  AdminNbParkingsRoute,
  AdminNbAgentsRoute,
  UnreadReviewsRoute,
} from '../core/routes';

const parkingIcon = <Icon name="parking" size={28} color="#3891c0" />;
const ReviewsIcon = <Icon2 name="customerservice" size={28} color="#3891c0" />;
const AgentIcon = <Icon name="user-shield" size={28} color="#3891c0" />;

export default function AdminDashboard({navigation}) {
  const [nbParking, setNbParking] = useState('');
  const [nbAgent, setNbAgent] = useState('');
  const [nbUnRev, setnbUnRev] = useState('');

  const getAdminNbParkings = async () => {
    try {
      axios({
        method: 'get',
        url: URL + AdminNbParkingsRoute,
      }).then(response => {
        console.log(response);
        setNbParking(JSON.stringify(response));
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getAdminNbAgents = async () => {
    try {
      axios({
        method: 'get',
        url: URL + AdminNbAgentsRoute,
      }).then(response => {
        console.log(response);
        setNbAgent(JSON.stringify(response));
      });
    } catch (error) {
      console.error(error);
    }
  };
  const getUnreadReviews = async () => {
    try {
      axios({
        method: 'get',
        url: URL + UnreadReviewsRoute,
      }).then(response => {
        console.log(response);
        setnbUnRev(JSON.stringify(response));
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAdminNbParkings();
    getAdminNbAgents();
    getUnreadReviews();
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.secondview}>
        <Image style={styles.image} source={core.logo} />

        <Text style={styles.bartext}>Dashboard</Text>

        <Image style={styles.image} source={core.logonotext} />
      </View>
      <View style={styles.thirdview}>
        <View style={styles.width}>
          <Card containerStyle={styles.cardborder}>
            <View style={styles.modalview}>
              <View style={styles.width}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => navigation.navigate('ManageParkings')}>
                  <Text style={styles.nbparkingtext}>{nbParking}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Card.Title style={styles.cardtitle}>
              {parkingIcon} Parkings
            </Card.Title>
          </Card>
          <Card containerStyle={styles.cardborder}>
            <View style={styles.cardview}>
              <TouchableOpacity
                style={[styles.button, styles.buttonOpen]}
                onPress={() => navigation.navigate('ManageAgents')}>
                <Text style={styles.cardtext}>{nbAgent}</Text>
              </TouchableOpacity>
            </View>

            <Card.Title style={styles.cardtitle}>{AgentIcon} Agents</Card.Title>
          </Card>
          <Card containerStyle={styles.cardborder}>
            <View style={styles.modalview}>
              <View style={styles.width}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={[styles.centeredView, styles.cardinnerview]}>
                    <View style={[styles.modalView, styles.cardinnerview]}>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible1(!modalVisible1)}>
                        <Text style={styles.textStyle}>Hide</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => navigation.navigate('ReviewsScreen')}>
                  <Text style={styles.text}>{nbUnRev} reviews</Text>
                </Pressable>
              </View>
            </View>

            <Card.Title style={styles.cardtitle}>
              {ReviewsIcon} Customer Reviews
            </Card.Title>
          </Card>
        </View>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('LoginScreenNoGoBack')}>
          <Icon name="logout" size={24} color={core.theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  touchable: {
    borderRadius: 70,
    width: 70,
    height: 70,
    marginTop: 60,
    backgroundColor: core.theme.colors.surface,
    alignSelf: 'flex-end',
    marginEnd: 30,
    alignItems: 'center',
    paddingEnd: 5,
    justifyContent: 'center',
    shadowColor: '#a9a9a9a',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 80,
    shadowOffset: {width: 1, height: 80},
  },
  text: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  cardtitle: {
    fontSize: 24,
    marginTop: 20,
  },
  scrollview: {
    width: '92.5%',
    height: '70%',
  },
  secondview: {
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
  image: {
    alignItems: 'flex-start',
    width: 60,
    height: 30,
    marginTop: 35,
    marginStart: 30,
  },
  bartext: {
    fontSize: 15,
    marginStart: 70,
    marginTop: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: core.theme.colors.primary,
  },
  thirdview: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 70,
  },
  modalview: {
    backgroundColor: core.theme.colors.primary,
    borderRadius: 10,
    alignItems: 'center',
  },
  nbparkingtext: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  cardview: {
    backgroundColor: core.theme.colors.primary,
    borderRadius: 10,
  },
  cardtext: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  cardinnerview: {
    width: '92.5%',
    height: '70%',
    alignSelf: 'center',
  },
  cardborder: {
    borderRadius: 15,
  },
  width: {
    width: '100%',
  },
});
