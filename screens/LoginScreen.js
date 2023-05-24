import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import axios from 'axios';
import core from '../core';
import helpers from '../helpers';
import components from '../components';
import {URL, LoginRoute} from '../core/routes';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const onLoginPressed = async () => {
    const emailError = helpers.emailValidator(email.value);
    const passwordError = helpers.passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }

    try {
      axios({
        method: 'post',
        url: URL + LoginRoute,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          login: email.value,
          password: password.value,
        },
      }).then(response => {
        console.log(response);
        if (
          response === 'Email Not Found!!' ||
          response === 'Invalid Password!!'
        )
          Alert.alert(response);
        else {
          if (response.role === 'driver') {
            navigation.reset({
              index: 0,
              routes: [{name: 'DriverDashboard'}],
            });
          }
          if (response.role === 'agent') {
            navigation.reset({
              index: 0,
              routes: [{name: 'AgentDashboard'}],
            });
          }
          if (response.role === 'admin') {
            navigation.reset({
              index: 0,
              routes: [{name: 'AdminDashboard'}],
            });
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageLayout} onPress={navigation.goBack}>
        <Image style={styles.image} source={core.backarrow} />
      </TouchableOpacity>

      <View style={styles.logo}>
        <components.Logo />
      </View>

      <ScrollView>
        <KeyboardAvoidingView>
          <View style={styles.center}>
            <components.Header>Welcome Back</components.Header>
          </View>
          <TextInput
            style={styles.inputtext}
            label="Email"
            returnKeyType="next"
            mode="outlined"
            value={email.value}
            onChangeText={text => setEmail({value: text, error: ''})}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.inputtext}
            label="Password"
            mode="outlined"
            returnKeyType="done"
            value={password.value}
            onChangeText={text => setPassword({value: text, error: ''})}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
          <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPasswordScreen')}>
              <Text style={styles.forgot}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
          <components.Button
            mode="contained"
            onPress={onLoginPressed}
            style={styles.button}>
            Login
          </components.Button>
          <View style={styles.row}>
            <Text>Don’t have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.replace('DriverSignUp')}>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: core.theme.colors.surface,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    marginStart: 90,
  },
  forgot: {
    fontSize: 13,
    color: core.theme.colors.secondary,
    marginRight: 60,
  },
  link: {
    fontWeight: 'bold',
    color: core.theme.colors.primary,
  },
  imageLayout: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
    marginStart: 30,
  },
  image: {
    width: 24,
    height: 24,
  },
  inputtext: {
    backgroundColor: core.theme.colors.surface,
    marginRight: 60,
    marginLeft: 60,
  },
  logo: {alignSelf: 'center', marginTop: 150},
  center: {alignSelf: 'center'},
  button: {marginTop: 24, width: 200, marginStart: 100},
});
