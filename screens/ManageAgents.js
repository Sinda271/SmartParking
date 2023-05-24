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
  ScrollView,
  Dimensions,
} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {List, Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import core from '../core';
import {
  URL,
  AdminAgentsTableRoute,
  AdminDeleteAgentRoute,
} from '../core/routes';

export default function ManageAgents({navigation}) {
  const adduser = <Icon name="adduser" size={28} color="#3891c0" />;
  const BackIcon = <Icon2 name="chevron-back" size={40} color="#3891c0" />;
  const Removeuser = <Icon name="deleteuser" size={28} color="#3891c0" />;
  const [modalVisible, setModalVisible] = useState(false);
  const [agentTable, setAgentTable] = useState([]);
  const [search, setSearch] = useState([]);

  const getAdminAgentsTable = async () => {
    try {
      axios({
        method: 'get',
        url: URL + AdminAgentsTableRoute,
      }).then(response => {
        console.log(response);
        setAgentTable(response);
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAdminAgentsTable();
  }, []);

  const state = {
    tableHead: ['CIN', 'Agent Name', 'Parking', 'Recruitment Date'],
    tableData: agentTable,
  };

  const searchFilter = text => {
    if (text) {
      const newdata = agentTable.filter(item => item[0].toString() === text);
      setSearch(newdata);
    }
  };
  var CINA = null;
  var name = '';
  var parking = '';
  var recrut = '';

  for (let i = 0; i < search.length; i++) {
    CINA = search[i][0];
    name = search[i][1];
    parking = search[i][2];
    recrut = search[i][3];
  }

  const onAgentRemove = async () => {
    try {
      axios({
        method: 'post',
        url: URL + AdminDeleteAgentRoute,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          cin: CINA,
        },
      }).then(response => {
        console.log(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <ScrollView>
        <Table
          borderStyle={{
            borderWidth: 2,
            borderColor: core.theme.colors.primary,
          }}>
          <Row
            data={state.tableHead}
            style={styles.Tabhead}
            textStyle={styles.TabHeadertext}
          />
          <Rows data={state.tableData} textStyle={styles.Tabtext} />
        </Table>

        <View
          style={{
            flexDirection: 'row',
            paddingStart: 200,
            justifyContent: 'center',
          }}>
          <View style={{width: '100%'}}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View
                style={[
                  styles.centeredView,
                  {width: '92.5%'},
                  {height: '70%'},
                  {alignSelf: 'center'},
                  {minHeight: Math.round(Dimensions.get('window').height)},
                ]}>
                <View
                  style={[
                    styles.modalView,
                    {width: '92.5%'},
                    {height: '61%'},
                    {alignSelf: 'center'},
                  ]}>
                  <View
                    style={[
                      styles.Tabcontainer,
                      {width: '92.5%'},
                      {height: '70%'},
                      {alignSelf: 'center'},
                      {alignItems: 'center'},
                    ]}>
                    <Searchbar
                      placeholder="CIN"
                      onChangeText={text => searchFilter(text)}
                      onIconPress={() => navigation.navigate('AdminDashboard')}
                    />
                  </View>
                  <View style={{marginBottom: 60}}>
                    <List.Accordion
                      style={{alignItems: 'flex-start', width: 340}}
                      title="Agent Informations"
                      left={props => (
                        <List.Icon
                          {...props}
                          icon="account"
                          color={core.theme.colors.primary}
                          style={styles.link}
                        />
                      )}>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingStart: 28,
                          marginBottom: 10,
                        }}>
                        <Text style={{fontWeight: 'bold'}}>CIN:</Text>
                        <Text> {CINA}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingStart: 28,
                          marginBottom: 10,
                        }}>
                        <Text style={{fontWeight: 'bold'}}>Agent Name:</Text>
                        <Text> {name}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingStart: 28,
                          marginBottom: 10,
                        }}>
                        <Text style={{fontWeight: 'bold'}}>Parking:</Text>
                        <Text> {parking}</Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          paddingStart: 28,
                          marginBottom: 10,
                        }}>
                        <Text style={{fontWeight: 'bold'}}>
                          Recrutment Date:
                        </Text>
                        <Text> {recrut}</Text>
                      </View>
                    </List.Accordion>
                  </View>
                  <Pressable
                    style={[
                      styles.button,
                      styles.buttonClose,
                      {marginBottom: 20},
                    ]}
                    onPress={() => onAgentRemove()}>
                    <Text style={styles.textStyle}>Remove Agent</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Hide</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  paddingTop: 30,
                  fontWeight: 'bold',
                  color: core.theme.colors.primary,
                  fontSize: 20,
                  marginLeft: 10,
                  marginRight: 100,
                  paddingBottom: 30,
                }}
                onPress={() => setModalVisible(true)}>
                {Removeuser}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingTop: 30,
                  fontWeight: 'bold',
                  color: core.theme.colors.primary,
                  fontSize: 20,
                  paddingBottom: 30,
                }}
                onPress={() => navigation.navigate('AgentSignUp')}>
                {adduser}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
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
        }}>
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            marginStart: 25,
            marginTop: 30,
          }}
          onPress={() => navigation.navigate('AdminDashboard')}>
          {BackIcon}
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            marginStart: 65,
            marginTop: 15,
            alignSelf: 'center',
            fontWeight: 'bold',
            color: core.theme.colors.primary,
          }}>
          Agent Management
        </Text>
        <Image
          style={styles.image}
          source={require('../assets/LogoNoText.png')}
        />
      </View>
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
    marginStart: 60,
    marginTop: 35,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,

    marginTop: 2,
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  Tabcontainer: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  Tabhead: {
    height: 40,
    backgroundColor: core.theme.colors.primary,
    marginTop: 120,
  },
  TabHeadertext: {
    fontWeight: 'bold',
    margin: 6,
    color: 'white',
    textAlign: 'center',
  },
  Tabtext: {
    margin: 6,
    color: core.theme.colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
