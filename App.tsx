import React from 'react';
import {Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  StartScreen,
  LoginScreen,
  SignupMode,
  SplashScreen,
  DriverSignUp,
  AgentSignUp,
  AdminSignUp,
  ResetPasswordScreen,
  DriverDashboard,
  AgentDashboard,
  DriverReservation,
  QrMapScreen,
  LoginScreenNoGoBack,
  DriverPayment,
  Qrcode,
  AdminDashboard,
  ManageParkings,
  ManageAgents,
  Fidelity,
  MessagesScreen,
  ChatScreen,
  ModifyReservation,
  AddParking,
} from './screens';
import core from './core';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={core.theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          {/* <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupMode" component={SignupMode} />
          <Stack.Screen name="DriverSignUp" component={DriverSignUp} />
          <Stack.Screen name="AgentSignUp" component={AgentSignUp} />
          <Stack.Screen name="AdminSignUp" component={AdminSignUp} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="DriverDashboard" component={DriverDashboard} />
          <Stack.Screen name="AgentDashboard" component={AgentDashboard} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen
            name="DriverReservation"
            component={DriverReservation}
          />
          <Stack.Screen name="QrMapScreenM1" component={QrMapScreen} />
          <Stack.Screen name="DriverPayment" component={DriverPayment} />
          <Stack.Screen name="Qrcode" component={Qrcode} />
          <Stack.Screen
            name="LoginScreenNoGoBack"
            component={LoginScreenNoGoBack}
          />
          <Stack.Screen name="ManageAgents" component={ManageAgents} />
          <Stack.Screen name="ManageParkings" component={ManageParkings} />
          <Stack.Screen name="FidelityPts" component={Fidelity} />
          <Stack.Screen name="ReviewsScreen" component={MessagesScreen} />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={({route}) => ({
              title: route.params.userName,
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen
            name="ModifyReservation"
            component={ModifyReservation}
          />
          <Stack.Screen name="AddParking" component={AddParking} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
