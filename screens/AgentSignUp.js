import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {TextInput} from 'react-native-paper';
import axios from 'axios';
import components from '../components';
import helpers from '../helpers';
import core from '../core';
import {URL, AgentPostRoute} from '../core/routes';
export default function AgentSignUp({navigation}) {
  const [Firstname, setFirstName] = useState({value: '', error: ''});
  const [Lastname, setLastName] = useState({value: '', error: ''});
  const [CIN, setCIN] = useState({value: '', error: ''});
  const [CNSS, setCNSS] = useState({value: '', error: ''});
  const [parking, setParking] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [phone, setPhone] = useState({value: '', error: ''});
  const [recrut, setRecrut] = useState({value: '', error: ''});

  const onSignUpPressed = () => {
    const FirstnameError = helpers.nameValidator(Firstname.value);
    const LastnameError = helpers.nameValidator(Lastname.value);
    const CINError = helpers.nameValidator(CIN.value);
    const CNSSError = helpers.nameValidator(CNSS.value);
    const ParkingError = helpers.nameValidator(parking.value);
    const emailError = helpers.emailValidator(email.value);
    const passwordError = helpers.passwordValidator(password.value);
    const phoneError = helpers.nameValidator(phone.value);
    const recrutError = helpers.nameValidator(recrut.value);
    if (
      recrutError ||
      phoneError ||
      emailError ||
      passwordError ||
      ParkingError ||
      CNSSError ||
      CINError ||
      LastnameError ||
      FirstnameError
    ) {
      setFirstName({...Firstname, error: FirstnameError});
      setLastName({...Lastname, error: LastnameError});
      setCIN({...CIN, error: CINError});
      setCNSS({...CNSS, error: CNSSError});
      setParking({...parking, error: ParkingError});
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      setPhone({...phone, error: phoneError});
      setRecrut({...recrut, error: recrutError});
      return;
    }
    try {
      axios({
        method: 'post',
        url: URL + AgentPostRoute,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          cin: CIN.value,
          firstname: Firstname.value,
          lastname: Lastname.value,
          login: email.value,
          password: password.value,
          phone: parseInt(phone.value),
          cnss: CNSS.value,
          recrutdate: recrut.value,
          parking: 58799,
        },
      }).then(response => {
        console.log(response);
        Alert.alert('Success', response, [
          {
            text: 'OK',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{name: 'AgentSignUp'}],
              });
            },
          },
        ]);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageLayout}
        onPress={() => navigation.navigate('ManageAgents')}>
        <Image
          style={styles.image}
          source={require('../assets/BackArrow.png')}
        />
      </TouchableOpacity>

      <View style={styles.logo}>
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
            label="Phone number"
            returnKeyType="next"
            value={phone.value}
            onChangeText={text => setPhone({value: text, error: ''})}
            error={!!phone.error}
            errorText={phone.error}
          />
          <TextInput
            style={styles.inputtext}
            mode="outlined"
            label="Recrutment date"
            returnKeyType="next"
            value={recrut.value}
            onChangeText={text => setRecrut({value: text, error: ''})}
            error={!!recrut.error}
            errorText={recrut.error}
          />
          <TextInput
            style={styles.inputtext}
            mode="outlined"
            label="CNSS"
            returnKeyType="next"
            value={CNSS.value}
            onChangeText={text => setCNSS({value: text, error: ''})}
            error={!!CNSS.error}
            errorText={CNSS.error}
          />
          <TextInput
            style={styles.inputtext}
            label="Parking Location"
            returnKeyType="next"
            mode="outlined"
            value={parking.value}
            onChangeText={text => setParking({value: text, error: ''})}
            error={!!parking.error}
            errorText={parking.error}
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
            Add Agent
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
  inputtext: {
    backgroundColor: core.theme.colors.surface,
    marginRight: 60,
    marginLeft: 60,
  },
  button: {marginTop: 24, width: 200, marginStart: 100},
  logo: {alignSelf: 'center', marginTop: 60},
});
