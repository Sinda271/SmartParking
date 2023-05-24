import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Content} from 'native-base';
import axios from 'axios';
import core from '../core';
import {URL, AdminReviewListRoute} from '../core/routes';

export default function MessagesScreen({navigation}) {
  const [ReviewList, setReviewList] = useState('');

  const getAdminReviewList = async () => {
    try {
      axios({
        method: 'get',
        url: URL + AdminReviewListRoute,
      }).then(response => {
        console.log(response);
        setReviewList(response);
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAdminReviewList();
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getAdminReviewList();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{backgroundColor: core.theme.colors.surface}}>
      <View style={styles.outerview}>
        <TouchableOpacity
          style={styles.imageLayout}
          onPress={() => navigation.navigate('AdminDashboard')}>
          <Image style={styles.image1} source={core.backarrow} />
        </TouchableOpacity>

        <Text style={styles.title}>Customer Reviews</Text>

        <Image style={styles.image} source={core.logonotext} />
      </View>

      <View style={styles.view1}>
        <Content
          padder
          contentContainerStyle={styles.flex}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <FlatList
            data={ReviewList}
            keyExtractor={item => item.idReview.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.touchable}
                onPress={() =>
                  navigation.navigate('ChatScreen', {
                    userName: item.username,
                    cin: item.CIN_SD,
                    Revid: item.idReview,
                  })
                }>
                <LinearGradient
                  style={styles.lg}
                  colors={['#00FFFF', '#37B6FF', '#3891c0', '#5C7EE6']}>
                  <Text style={styles.lgtext}>
                    {' '}
                    {item.username.split(' ')[0][0]}
                    {item.username.split(' ')[1][0]}{' '}
                  </Text>
                </LinearGradient>

                <View style={styles.view2}>
                  <View style={styles.view3}>
                    <Text style={styles.text1}>{item.username}</Text>
                    <Text style={styles.text2}>{item.messageTime1}</Text>
                  </View>
                  <Text style={styles.text3}>{item.messageText}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </Content>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: core.theme.colors.surface,
  },
  text: {margin: 6},
  image: {
    width: 30,
    height: 30,
    marginStart: 70,
    marginTop: 35,
  },
  row: {flexDirection: 'row', width: 470, height: 100},

  image1: {
    width: 30,
    height: 30,
    marginStart: 30,
    marginTop: 35,
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

  Tabhead: {
    height: 40,
    width: 410,
    backgroundColor: core.theme.colors.surface,
    borderBottomColor: '#a9a9a9',
  },
  TabHeadertext: {
    margin: 6,
    color: core.theme.colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Tabtext: {
    color: core.theme.colors.text,
    margin: 10,
    textAlign: 'left',
    fontWeight: '200',
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
  title: {
    fontSize: 15,
    marginStart: 85,
    marginTop: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: core.theme.colors.primary,
  },
  view1: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    backgroundColor: core.theme.colors.surface,
    paddingTop: 70,
    position: 'absolute',
    height: 1000,
    width: 410,
    alignSelf: 'center',
    marginTop: 50,
  },
  flex: {flex: 1},
  touchable: {flexDirection: 'row', justifyContent: 'space-between'},
  lg: {
    height: 50,
    width: 50,
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  lgtext: {
    position: 'absolute',
    marginTop: 12,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: core.theme.colors.surface,
    fontSize: 17,
  },
  view2: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  view3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  text1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: core.theme.colors.primary,
  },
  text2: {fontSize: 12, color: '#666'},
  text3: {fontSize: 14, color: '#333333'},
});
