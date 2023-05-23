import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Title, Caption, Drawer, Text} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import core from '../core';
import {URL, DriverProfilePersonalInfoRoute} from '../core/routes';
export default function DrawerContent(props) {
  const [personalInfo, setPersonalInfo] = useState({});

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

  useEffect(() => {
    getDriverProfilePersonalInfo();
  }, []);

  return (
    <View style={styles.outerview}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.view}>
              <LinearGradient
                style={styles.lg}
                colors={['#00FFFF', '#37B6FF', '#3891c0', '#5C7EE6']}>
                <Text style={styles.lgtext}>{personalInfo.initials}</Text>
              </LinearGradient>

              <View style={styles.center}>
                <Title style={styles.title}>
                  {personalInfo.firstname} {personalInfo.lastname}
                </Title>
                <Caption style={styles.caption}>{personalInfo.email}</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({size}) => (
                <FontAwesome
                  name="home"
                  size={size}
                  color={core.theme.colors.primary}
                />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('DriverHome');
              }}
              style={styles.margin}
            />
            <DrawerItem
              icon={({size}) => (
                <FontAwesome
                  name="user"
                  size={size}
                  color={core.theme.colors.primary}
                />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('DriverProfile');
              }}
              style={styles.margin}
            />
            <DrawerItem
              icon={({size}) => (
                <MaterialIcons
                  name="book-online"
                  size={size}
                  color={core.theme.colors.primary}
                />
              )}
              label="Reservations"
              onPress={() => {
                props.navigation.navigate('DriverReservations');
              }}
              style={styles.margin}
            />
            <DrawerItem
              icon={({size}) => (
                <MaterialIcons
                  name="payment"
                  size={size}
                  color={core.theme.colors.primary}
                />
              )}
              label="Payments"
              onPress={() => {
                props.navigation.navigate('DriverPaymentHistory');
              }}
              style={styles.margin}
            />
            <DrawerItem
              icon={({size}) => (
                <MaterialIcons
                  name="support-agent"
                  size={size}
                  color={core.theme.colors.primary}
                />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate('DriverSupport');
              }}
            />
            <DrawerItem
              icon={({size}) => (
                <MaterialIcons
                  name="description"
                  size={size}
                  color={core.theme.colors.primary}
                />
              )}
              label="About"
              onPress={() => {
                props.navigation.navigate('About');
              }}
              style={styles.margin}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({size}) => (
            <FontAwesome
              name="sign-out"
              size={size}
              color={core.theme.colors.primary}
            />
          )}
          label="Sign Out"
          onPress={() => {
            props.navigation.navigate('LoginScreenNoGoBack');
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    marginTop: 30,
  },
  userInfoSection: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  view: {
    alignItems: 'center',
    backgroundColor: core.theme.colors.surface,
    borderRadius: 20,
  },
  lg: {
    height: 50,
    width: 50,
    borderRadius: 30,
    alignSelf: 'center',
  },
  lgtext: {
    position: 'absolute',
    marginTop: 12,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: core.theme.colors.surface,
    fontSize: 17,
  },
  center: {alignItems: 'center'},
  margin: {marginStart: 13},
  outerview: {flex: 1},
});
