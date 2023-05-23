import React, {useState} from 'react';
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
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {TextInput} from 'react-native-paper';
import helpers from '../helpers';
import components from '../components';
import core from '../core';

export default function AdminSignUp({navigation}) {
  const [Firstname, setFirstName] = useState({value: '', error: ''});
  const [Lastname, setLastName] = useState({value: '', error: ''});
  const [CIN, setCIN] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const onSignUpPressed = () => {
    const FirstnameError = helpers.nameValidator(Firstname.value);
    const LastnameError = helpers.nameValidator(Lastname.value);
    const CINError = helpers.nameValidator(CIN.value);
    const emailError = helpers.emailValidator(email.value);
    const passwordError = helpers.passwordValidator(password.value);
    if (
      emailError ||
      passwordError ||
      CINError ||
      LastnameError ||
      FirstnameError
    ) {
      setFirstName({...Firstname, error: FirstnameError});
      setLastName({...Lastname, error: LastnameError});
      setCIN({...CIN, error: CINError});
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{name: 'AdminDashboard'}],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageLayout} onPress={navigation.goBack}>
        <Image style={styles.image} source={core.backarrow} />
      </TouchableOpacity>

      <View style={styles.logoview}>
        <components.Logo />
      </View>

      <ScrollView style={styles.scrollView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'padding' : null}>
          <TextInput
            style={styles.inputtext}
            label="First Name"
            returnKeyType="next"
            mode="outlined"
            value={Firstname.value}
            onChangeText={text => setFirstName({value: text, error: ''})}
            error={!!Firstname.error}
            errorText={Firstname.error}
          />
          <TextInput
            style={styles.inputtext}
            label="Last Name"
            returnKeyType="next"
            mode="outlined"
            value={Lastname.value}
            onChangeText={text => setLastName({value: text, error: ''})}
            error={!!Lastname.error}
            errorText={Lastname.error}
          />
          <TextInput
            style={styles.inputtext}
            mode="outlined"
            label="CIN"
            returnKeyType="next"
            value={CIN.value}
            onChangeText={text => setCIN({value: text, error: ''})}
            error={!!CIN.error}
            errorText={CIN.error}
          />
          <TextInput
            style={styles.inputtext}
            mode="outlined"
            label="Email"
            returnKeyType="next"
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
            mode="outlined"
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={text => setPassword({value: text, error: ''})}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />

          <components.Button
            mode="contained"
            onPress={onSignUpPressed}
            style={styles.button}>
            Sign Up
          </components.Button>
          <View style={styles.row}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
              <Text style={styles.link}>Login</Text>
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
  row: {
    flexDirection: 'row',
    marginTop: 4,
    marginStart: 90,
  },
  link: {
    fontWeight: 'bold',
    color: core.theme.colors.primary,
  },
  scrollView: {
    backgroundColor: core.theme.colors.surface,
  },
  inputtext: {
    backgroundColor: core.theme.colors.surface,
    marginRight: 60,
    marginLeft: 60,
  },
  button: {
    marginTop: 24,
    width: 200,
    marginStart: 100,
  },
  logoview: {
    alignSelf: 'center',
    marginTop: 100,
  },
});
