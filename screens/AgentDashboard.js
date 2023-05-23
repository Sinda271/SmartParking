import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet, View} from 'react-native';
import core from '../core';
import AgentDrawer from './AgentDrawer';
import AgentHome from './AgentHome';
import BalanceDetails from './BalanceDetails';
import AgentProfile from './AgentProfile';
import AgentPhoneCall from './AgentPhoneCall';

const Drawer = createDrawerNavigator();

export default function AgentDashboard() {
  return (
    <View style={styles.container}>
      <Drawer.Navigator drawerContent={props => <AgentDrawer {...props} />}>
        <Drawer.Screen name="AgentHome" component={AgentHome} />
        <Drawer.Screen name="AgentProfile" component={AgentProfile} />
        <Drawer.Screen name="BalanceDetails" component={BalanceDetails} />
        <Drawer.Screen name="Phone Call" component={AgentPhoneCall} />
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
