import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {Title, Caption, List, IconButton, TextInput} from 'react-native-paper';
import axios from 'axios';
import helpers from '../helpers';
import core from '../core';
import {
  URL,
  AgentProfilePersonalInfoRoute,
  ResetAgentPasswordRoute,
} from '../core/routes';
export default function AgentProfile({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentpwd, setCurrentpwd] = useState({value: '', error: ''});
  const [newpwd, setNewpwd] = useState({value: '', error: ''});
  const [confirmpwd, setConfirmpwd] = useState({value: '', error: ''});
  const [personalInfo, setPersonalInfo] = useState({});

  const getAgentProfilePersonalInfo = async () => {
    try {
      axios({
        method: 'get',
        url: URL + AgentProfilePersonalInfoRoute,
      }).then(response => {
        console.log(response);
        setPersonalInfo(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAgentProfilePersonalInfo();
  }, []);

  const onChangePressed = async () => {
    const currentpwdError = helpers.passwordValidator(currentpwd.value);
    const newpwdError = helpers.passwordValidator(newpwd.value);
    const confirmpwdError = helpers.passwordValidator(confirmpwd.value);

    if (currentpwdError || newpwdError || confirmpwdError) {
      setCurrentpwd({...currentpwd, error: currentpwdError});
      setNewpwd({...newpwd, error: newpwdError});
      setConfirmpwd({...confirmpwd, error: confirmpwdError});
      return;
    }

    if (newpwd.value === confirmpwd.value) {
      try {
        axios({
          method: 'post',
          url: URL + ResetAgentPasswordRoute,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          data: {password: newpwd.value},
        }).then(response => {
          console.log(response);
          Alert.alert(response);
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert("You didn't confirm your password correctly!");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#00FFFF', '#37B6FF', '#3891c0', '#5C7EE6']}
        style={styles.container}>
        <View style={styles.outerview}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={navigation.openDrawer}>
            <FontAwesome
              name="bars"
              size={24}
              color={core.theme.colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.bartext}>Profile</Text>

          <Image style={styles.image} source={core.logonotext} />
        </View>
        <LinearGradient
          style={styles.imageHolder}
          colors={['#00FFFF', '#37B6FF', '#3891c0', '#5C7EE6']}>
          <Text style={styles.lgtext}>{personalInfo.initials}</Text>
        </LinearGradient>
        <View style={styles.view2}>
          <View style={styles.view3}>
            <Title style={styles.title}>
              {personalInfo.firstname} {personalInfo.lastname}
            </Title>
            <Caption style={styles.caption}>{personalInfo.email}</Caption>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'android' ? 'padding' : null}>
              <ScrollView style={styles.scrollView}>
                <List.Accordion
                  style={styles.list}
                  title="Personal Information"
                  left={props => (
                    <List.Icon
                      {...props}
                      icon="account"
                      color={core.theme.colors.primary}
                      style={styles.link}
                    />
                  )}>
                  <View style={styles.listview}>
                    <Text style={styles.font}>First Name:</Text>
                    <Text> {personalInfo.firstname}</Text>
                  </View>
                  <View style={styles.listview}>
                    <Text style={styles.font}>Last Name:</Text>
                    <Text> {personalInfo.lastname}</Text>
                  </View>
                  <View style={styles.listview}>
                    <Text style={styles.font}>CIN:</Text>
                    <Text> {personalInfo.cin}</Text>
                  </View>
                </List.Accordion>
                <List.Accordion
                  style={styles.list}
                  title="Login Settings"
                  left={props => (
                    <List.Icon
                      {...props}
                      icon="history"
                      color={core.theme.colors.primary}
                      style={styles.link}
                    />
                  )}>
                  <View style={styles.listview}>
                    <Text style={styles.font}>Email:</Text>
                    <Text> {personalInfo.email}</Text>
                  </View>

                  <View style={styles.view4}>
                    <Text style={styles.resettext}>Reset Password</Text>
                    <IconButton
                      icon="playlist-edit"
                      color={core.theme.colors.primary}
                      size={20}
                      onPress={() => {
                        setModalVisible(true);
                      }}
                    />
                  </View>
                </List.Accordion>
              </ScrollView>
            </KeyboardAvoidingView>

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
                  styles.modalviews,
                  {minHeight: Math.round(Dimensions.get('window').height)},
                ]}>
                <View style={[styles.modalView, styles.modalviews]}>
                  <View
                    style={[
                      styles.Tabcontainer,
                      styles.modalviews,
                      styles.center,
                    ]}>
                    <View style={styles.view5}>
                      <Text style={styles.reset}>Reset Password</Text>
                      <TextInput
                        style={styles.inputtext}
                        label="Current Password"
                        mode="outlined"
                        returnKeyType="next"
                        value={currentpwd.value}
                        onChangeText={text =>
                          setCurrentpwd({value: text, error: ''})
                        }
                        error={!!currentpwd.error}
                        errorText={currentpwd.error}
                        secureTextEntry
                      />
                      <TextInput
                        style={styles.inputtext}
                        label="New Password"
                        mode="outlined"
                        returnKeyType="next"
                        value={newpwd.value}
                        onChangeText={text =>
                          setNewpwd({value: text, error: ''})
                        }
                        error={!!newpwd.error}
                        errorText={newpwd.error}
                        secureTextEntry
                      />
                      <TextInput
                        style={styles.inputtext}
                        label="Confirm New Password"
                        mode="outlined"
                        returnKeyType="done"
                        value={confirmpwd.value}
                        onChangeText={text =>
                          setConfirmpwd({value: text, error: ''})
                        }
                        error={!!confirmpwd.error}
                        errorText={confirmpwd.error}
                        secureTextEntry
                      />
                    </View>
                  </View>
                  <Pressable
                    style={[styles.button, styles.buttonClose, styles.bottom]}
                    onPress={() => onChangePressed()}>
                    <Text style={styles.textStyle}>Change</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Hide</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </LinearGradient>
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
    marginStart: 125,
    marginTop: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  buttonClose: {
    backgroundColor: core.theme.colors.primary,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: '100%',
  },
  avatar: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    marginBottom: 100,
    alignSelf: 'center',
    marginTop: 6,
  },
  imageHolder: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: 'transparent',
    marginBottom: 100,
    alignSelf: 'center',
    marginTop: 200,
    zIndex: 999,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    alignSelf: 'center',
  },
  scrollView: {
    backgroundColor: core.theme.colors.surface,
    borderRadius: 30,
    overflow: 'scroll',
  },
  link: {
    fontWeight: 'bold',
    color: core.theme.colors.primary,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
  },
  Tabcontainer: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  outerview: {
    backgroundColor: core.theme.colors.surface,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    height: 80,
    width: 412,
    flexDirection: 'row',
  },
  touchable: {
    alignItems: 'flex-start',
    marginTop: 35,
    marginStart: 30,
  },
  bartext: {
    fontSize: 15,
    marginStart: 130,
    marginTop: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: core.theme.colors.primary,
  },
  lgtext: {
    position: 'absolute',
    marginTop: 14,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: core.theme.colors.surface,
    fontSize: 70,
  },
  view2: {
    flex: 1,
    marginTop: 200,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    marginStart: 30,
    marginEnd: 30,
    backgroundColor: core.theme.colors.surface,
    justifyContent: 'center',
  },
  listview: {
    flexDirection: 'row',
    paddingStart: 28,
    marginBottom: 10,
  },
  font: {
    fontWeight: 'bold',
  },
  view3: {
    flex: 1,
    marginTop: 80,
    marginBottom: 55,
  },
  list: {
    alignItems: 'flex-start',
    width: 340,
  },
  view4: {
    flexDirection: 'row',
    paddingStart: 130,
    justifyContent: 'center',
  },
  resettext: {
    flexDirection: 'row',
    paddingStart: 130,
    justifyContent: 'center',
  },
  inputtext: {
    backgroundColor: core.theme.colors.surface,
    marginRight: 60,
    marginLeft: 60,
    height: 50,
    marginBottom: 20,
  },
  modalviews: {
    width: '92.5%',
    height: '70%',
    alignSelf: 'center',
  },
  center: {alignItems: 'center'},
  bottom: {marginBottom: 10},
  reset: {
    fontSize: 20,
    fontWeight: 'bold',
    color: core.theme.colors.primary,
    marginStart: 60,
    marginBottom: 30,
  },
  view5: {height: 100, width: 400},
});
