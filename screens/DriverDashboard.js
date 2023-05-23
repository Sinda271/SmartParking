import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DriverHome from './DriverHome';
import DriverProfile from './DriverProfile';
import DrawerContent from './DrawerContent';
import DriverPaymentHistory from './DriverPaymentHistory';
import DriverSupport from './DriverSupport';
import DriverReservations from './DriverReservationHistory';
import About from './AboutScreen';
import core from '../core';
const Drawer = createDrawerNavigator();

export default function DriverDashboard() {
  return (
    <View style={styles.container}>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="DriverHome" component={DriverHome} />
        <Drawer.Screen name="DriverProfile" component={DriverProfile} />
        <Drawer.Screen
          name="DriverPaymentHistory"
          component={DriverPaymentHistory}
        />
        <Drawer.Screen name="DriverSupport" component={DriverSupport} />
        <Drawer.Screen
          name="DriverReservations"
          component={DriverReservations}
        />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: core.theme.colors.surface,
  },
});
