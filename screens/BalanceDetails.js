import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import FontAwesome from '@expo/vector-icons';
import {Table, Row, Rows} from 'react-native-table-component';
import axios from 'axios';
import components from '../components';
import core from '../core';
import {URL, AgentBalanceDetailsRoute} from '../core/routes';
export default function BalanceDetails({navigation}) {
  const [searchbar, setSearchbar] = useState(false);
  const [search, setSearch] = useState('');
  const [balanceDetail, setBalanceDetail] = useState([]);

  const getAgentBalanceDetails = async () => {
    try {
      axios({
        method: 'get',
        url: URL + AgentBalanceDetailsRoute,
      }).then(response => {
        console.log(response);
        setBalanceDetail(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAgentBalanceDetails();
  }, []);

  const state = {
    tableHead: ['Tr N°', 'Amount', 'Client', 'Licence Plate', 'Date'],
    tableData: balanceDetail,
  };

  const searchFilter = text => {
    if (text) {
      const newdata = balanceDetail.filter(item => !item[4].search(text));
      setSearch(newdata);
      setSearchbar(true);
    } else {
      setSearchbar(false);
    }
  };

  const searchedData = {
    tableHead: ['Tr N°', 'Amount', 'Client', 'Licence Plate', 'Date'],
    tableData: search,
  };
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={navigation.openDrawer}>
          <FontAwesome
            name="bars"
            size={24}
            color={core.theme.colors.primary}
          />
        </TouchableOpacity>

        <Text style={styles.bartext}>Balance</Text>

        <Image style={styles.image} source={core.theme} />
      </View>
      <View style={styles.view1}>
        <components.SearchBar
          onChangeText={text => searchFilter(text)}></components.SearchBar>
      </View>
      <View style={styles.margin}>
        <ScrollView>
          <Table style={styles.tab}>
            <Row
              data={state.tableHead}
              style={styles.row}
              textStyle={styles.TabHeadertext}
            />
            {!searchbar ? (
              <Rows
                data={state.tableData}
                style={styles.row}
                textStyle={styles.Tabtext}
              />
            ) : (
              <Rows
                data={searchedData.tableData}
                style={styles.row}
                textStyle={styles.Tabtext}
              />
            )}
          </Table>
        </ScrollView>
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
    backgroundColor: core.theme.colors.surface,
    borderBottomColor: '#a9a9a9',
  },
  TabHeadertext: {
    margin: 6,
    color: core.theme.colors.text,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Tabtext: {
    margin: 6,
    color: core.theme.colors.text,
    textAlign: 'center',
  },
  view: {
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
  touchable: {alignItems: 'flex-start', marginTop: 35, marginStart: 30},
  bartext: {
    fontSize: 15,
    marginStart: 125,
    marginTop: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: core.theme.colors.primary,
  },
  view1: {marginTop: 150, marginStart: 50, marginEnd: 70},
  row: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(52, 52, 52, 0.1)',
  },
  margin: {marginTop: 50},
  tab: {width: 390, alignSelf: 'center'},
});
