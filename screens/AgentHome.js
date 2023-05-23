import React, {useEffect, useState} from 'react';
import {LineChart} from 'react-native-chart-kit';
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
import {Card, Badge} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Table, Row, Rows} from 'react-native-table-component';
import axios from 'axios';
import core from '../core';
import {
  URL,
  AgentfreeSpacesRoute,
  AgentfreeSpacesTableRoute,
  AgentBalanceGraphRoute,
  AgentTodayBalanceRoute,
} from '../core/routes';

const parkingIcon = <Icon name="parking" size={28} color="#3891c0" />;
const balance = <Icon2 name="finance" size={28} color="#3891c0" />;
const alert = <Icon2 name="boom-gate-alert" size={28} color="#3891c0" />;
const occupied = <Badge status="error" />;
const free = <Badge status="success" />;

export default function AgentHome({navigation}) {
  const [rep, setRep] = useState('');
  const [freeTable, setFreeTable] = useState([]);
  const [balanceGraph, setBalanceGraph] = useState([]);
  const [todayBalance, setTodayBalance] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  const getAgentfreeSpaces = async () => {
    try {
      axios({
        method: 'get',
        url: URL + AgentfreeSpacesRoute,
      }).then(response => {
        console.log(response);
        setRep(JSON.stringify(response));
      });
    } catch (error) {
      console.error(error);
    }
  };
  const getAgentfreeSpacesTable = async () => {
    try {
      axios({
        method: 'get',
        url: URL + AgentfreeSpacesTableRoute,
      }).then(response => {
        console.log(response);
        setFreeTable(JSON.stringify(response));
      });
    } catch (error) {
      console.error(error);
    }
  };
  const getAgentBalanceGraph = async () => {
    try {
      axios({
        method: 'get',
        url: URL + AgentBalanceGraphRoute,
      }).then(response => {
        console.log(response);
        setBalanceGraph(JSON.stringify(response));
      });
    } catch (error) {
      console.error(error);
    }
  };
  const getAgentTodayBalance = async () => {
    try {
      axios({
        method: 'get',
        url: URL + AgentTodayBalanceRoute,
      }).then(response => {
        console.log(response);
        setTodayBalance(JSON.stringify(response));
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAgentfreeSpaces();
    getAgentfreeSpacesTable();
    getAgentBalanceGraph();
    getAgentTodayBalance();
  }, []);

  const state = {
    tableHead: ['Place', 'Status'],
    tableData: freeTable,
  };
  const weeklybalance = {
    labels: balanceGraph.day,
    datasets: [
      {
        data: balanceGraph.profit,
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 2,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 0,
    color: (opacity = 2) => `rgba(56, 145, 192, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 1,
    useShadowColorFromDataset: true,
  };

  return (
    <View style={styles.container}>
      <View style={styles.outerview}>
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
      <View style={styles.secondview}>
        <View style={styles.width}>
          <Card containerStyle={styles.cardborder}>
            <View style={styles.thirdview}>
              <View style={styles.width}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={[styles.centeredView, styles.modalviews]}>
                    <View style={[styles.modalView, styles.modalviews]}>
                      <View style={[styles.Tabcontainer, styles.modalviews]}>
                        <Table borderStyle={styles.tableborder}>
                          <Row
                            data={state.tableHead}
                            style={styles.Tabhead}
                            textStyle={styles.TabHeadertext}
                          />
                          <Rows
                            data={state.tableData}
                            textStyle={styles.Tabtext}
                          />
                        </Table>
                      </View>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Hide</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => setModalVisible(true)}>
                  <Text style={styles.text}>{rep}</Text>
                </Pressable>
              </View>
            </View>

            <Card.Title style={styles.cardtitle}>
              {parkingIcon} Free Spaces
            </Card.Title>
          </Card>
          <Card containerStyle={styles.cardborder}>
            <View style={styles.thirdview}>
              <Text style={styles.cardtext}>10</Text>
            </View>

            <Card.Title style={styles.cardtitle}>{alert} Alerts</Card.Title>
          </Card>
          <Card containerStyle={styles.cardborder}>
            <View style={styles.thirdview}>
              <View style={styles.width}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible1}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible1);
                  }}>
                  <View style={[styles.centeredView, styles.modalviews]}>
                    <View style={[styles.modalView, styles.modalviews]}>
                      <View
                        style={[
                          styles.Tabcontainer,
                          styles.modalviews,
                          styles.center,
                        ]}>
                        <LineChart
                          data={weeklybalance}
                          width={350}
                          height={256}
                          verticalLabelRotation={30}
                          chartConfig={chartConfig}
                          bezier
                        />
                      </View>
                      <Pressable
                        style={[
                          styles.button,
                          styles.buttonClose,
                          styles.bottom,
                        ]}
                        onPress={() => {
                          navigation.navigate('BalanceDetails');
                        }}>
                        <Text style={styles.textStyle}>More Details</Text>
                      </Pressable>
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
                  onPress={() => setModalVisible1(true)}>
                  <Text style={styles.text}>{todayBalance} TND</Text>
                </Pressable>
              </View>
            </View>

            <Card.Title style={styles.cardtitle}>
              {balance} Today's Profit
            </Card.Title>
          </Card>
        </View>
        <TouchableOpacity style={styles.touchable} onPress={() => {}}>
          <Feather name="bell" size={24} color={core.theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: core.theme.colors.surface,
  },
  outerview: {
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
  menu: {
    alignItems: 'flex-start',
    marginTop: 35,
    marginStart: 30,
  },
  image: {
    width: 30,
    height: 30,
    marginStart: 130,
    marginTop: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
  textbar: {
    fontSize: 15,
    marginStart: 133,
    marginTop: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: core.theme.colors.primary,
  },
  secondview: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 160,
  },
  width: {
    width: '100%',
  },
  cardborder: {
    borderRadius: 15,
  },
  thirdview: {
    backgroundColor: core.theme.colors.primary,
    borderRadius: 10,
    alignItems: 'center',
  },

  modalviews: {
    width: '92.5%',
    height: '70%',
    alignSelf: 'center',
  },
  center: {
    alignItems: 'center',
  },
  cardtitle: {
    fontSize: 24,
    marginTop: 20,
  },
  tableborder: {
    borderWidth: 2,
    borderColor: core.theme.colors.primary,
  },
  text: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardtext: {
    marginBottom: 10,
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  bottom: {
    marginBottom: 20,
  },
  touchable: {
    borderRadius: 70,
    width: 70,
    height: 70,
    marginTop: 60,
    backgroundColor: core.theme.colors.surface,
    alignSelf: 'flex-end',
    marginEnd: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#a9a9a9a',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 80,
    shadowOffset: {width: 1, height: 80},
  },
  Tabcontainer: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  Tabhead: {height: 40, backgroundColor: core.theme.colors.primary},
  TabHeadertext: {margin: 6, color: 'white', textAlign: 'center'},
  Tabtext: {
    margin: 6,
    color: core.theme.colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
