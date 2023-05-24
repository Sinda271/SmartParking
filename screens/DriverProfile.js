import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {Title, Caption, List} from 'react-native-paper';
import axios from 'axios';
import core from '../core';
import {
  URL,
  DriverProfilePersonalInfoRoute,
  DriverProfileCarFeaturesRoute,
} from '../core/routes';

export default function DriverProfile({navigation}) {
  const [personalInfo, setPersonalInfo] = useState([]);
  const [CarFeatures, setCarFeatures] = useState([]);

  const getDriverProfilePersonalInfo = async () => {
    try {
      axios({
        method: 'get',
        url: URL + DriverProfilePersonalInfoRoute,
      }).then(response => {
        console.log(response);
        setPersonalInfo(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getDriverProfileCarFeatures = async () => {
    try {
      axios({
        method: 'get',
        url: URL + DriverProfileCarFeaturesRoute,
      }).then(response => {
        console.log(response);
        setCarFeatures(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDriverProfilePersonalInfo();
    getDriverProfileCarFeatures();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#00FFFF', '#37B6FF', '#3891c0', '#5C7EE6']}
        style={styles.container}>
        <View style={styles.outerview}>
          <TouchableOpacity style={styles.menu} onPress={navigation.openDrawer}>
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
        <View style={styles.innerview}>
          <View style={styles.view1}>
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
                  <View style={styles.view2}>
                    <Text style={styles.weight}>First Name:</Text>
                    <Text> {personalInfo.firstname} </Text>
                  </View>
                  <View style={styles.view2}>
                    <Text style={styles.weight}>Last Name:</Text>
                    <Text> {personalInfo.lastname}</Text>
                  </View>
                  <View style={styles.view2}>
                    <Text style={styles.weight}>CIN:</Text>
                    <Text> {personalInfo.cin}</Text>
                  </View>
                  <View style={styles.view2}>
                    <Text style={styles.weight}>Email:</Text>
                    <Text> {personalInfo.email}</Text>
                  </View>
                </List.Accordion>

                <List.Accordion
                  style={styles.list}
                  title="Car Features"
                  left={props => (
                    <List.Icon
                      {...props}
                      icon="car"
                      color={core.theme.colors.primary}
                      style={styles.link}
                    />
                  )}>
                  <View style={styles.view2}>
                    <Text style={styles.weight}>Licence Plate:</Text>
                    <Text> {CarFeatures.licenceplate}</Text>
                  </View>
                  <View style={styles.view2}>
                    <Text style={styles.weight}>Size:</Text>
                    <Text> {CarFeatures.size}</Text>
                  </View>
                  <View style={styles.view2}>
                    <Text style={styles.weight}>Color:</Text>
                    <Text> {CarFeatures.color}</Text>
                  </View>
                  <View style={styles.view2}>
                    <Text style={styles.weight}>Brand:</Text>
                    <Text> {CarFeatures.brand}</Text>
                  </View>
                </List.Accordion>
              </ScrollView>
            </KeyboardAvoidingView>
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
  outerview: {
    backgroundColor: core.theme.colors.surface,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    height: 80,
    width: 412,
    flexDirection: 'row',
  },
  menu: {alignItems: 'flex-start', marginTop: 35, marginStart: 30},
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
  innerview: {
    flex: 1,
    marginTop: 200,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    marginStart: 30,
    marginEnd: 30,
    backgroundColor: core.theme.colors.surface,
    justifyContent: 'center',
  },
  view1: {flex: 1, marginTop: 80, marginBottom: 55},
  list: {alignItems: 'flex-start', width: 340},
  view2: {
    flexDirection: 'row',
    paddingStart: 28,
    marginBottom: 10,
  },
  weight: {fontWeight: 'bold'},
});
