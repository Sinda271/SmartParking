import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {TextInput} from 'react-native-paper';
import helpers from '../helpers';
import core from '../core';
import components from '../components';

export default function ResetPasswordScreen({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});

  const sendResetPasswordEmail = () => {
    const emailError = helpers.emailValidator(email.value);
    if (emailError) {
      setEmail({...email, error: emailError});
      return;
    }
    navigation.navigate('LoginScreen');
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
            <components.Header>Reset Password</components.Header>
          </View>
          <TextInput
            style={styles.input}
            mode="outlined"
            label="E-mail address"
            returnKeyType="done"
            value={email.value}
            onChangeText={text => setEmail({value: text, error: ''})}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <Text style={styles.text}>
            You will receive an email with a password{' '}
          </Text>
          <Text style={styles.text}>reset link.</Text>
          <components.Button
            mode="contained"
            onPress={sendResetPasswordEmail}
            style={styles.button}>
            Send
          </components.Button>
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
  logo: {alignSelf: 'center', marginTop: 200},
  center: {alignSelf: 'center'},
  input: {
    backgroundColor: core.theme.colors.surface,
    marginRight: 60,
    marginLeft: 60,
  },
  button: {marginTop: 24, width: 200, alignSelf: 'center'},
  text: {marginStart: 63},
});
