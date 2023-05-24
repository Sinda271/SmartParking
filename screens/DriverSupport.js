import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-paper';
import axios from 'axios';
import core from '../core';
import {URL, DriverSupportReviewsRoute} from '../core/routes';
export default function DriverSupport({navigation}) {
  const [content, setContent] = useState({value: ''});
  const [subject, setSubject] = useState({value: ''});

  const onSendPressed = async () => {
    try {
      axios({
        method: 'post',
        url: URL + DriverSupportReviewsRoute,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          SubjectRev: subject.value,
          ContentRev: content.value,
          msgDateTime: new Date(),
        },
      }).then(response => {
        console.log(response);
        this.textInput.clear();
        this.textField.clear();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.outerview}>
        <TouchableOpacity style={styles.menu} onPress={navigation.openDrawer}>
          <FontAwesome
            name="bars"
            size={24}
            color={core.theme.colors.surface}
          />
        </TouchableOpacity>
        <Text style={styles.bartext}>Support</Text>

        <Image style={styles.image} source={core.logonotext} />
      </View>
      <Image style={styles.logo} source={core.logo} />
      <Text style={styles.text}>How can we help you?</Text>
      <View style={styles.innerview}>
        <TextInput
          ref={input => {
            this.textField = input;
          }}
          style={styles.input1}
          label="Subject"
          returnKeyType="done"
          mode="outlined"
          onChangeText={text => setSubject({value: text})}
          placeholderTextColor="#3891c0"
        />
        <TextInput
          ref={input => {
            this.textInput = input;
          }}
          style={styles.input2}
          label="Describe your issue"
          placeholderTextColor="#3891c0"
          returnKeyType="done"
          mode="outlined"
          onChangeText={text => setContent({value: text})}
          multiline={true}
          numberOfLines={5}
        />
        <TouchableOpacity style={styles.touchable} onPress={onSendPressed}>
          <Text style={styles.textbutton}>SEND</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.contact}>Contact:</Text>
      <View style={styles.view}>
        <Text style={styles.contacttext}>Email: </Text>
        <Text>Contact@partorre.com</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.contacttext}>Phone: </Text>
        <Text>27715816</Text>
      </View>
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
    marginStart: 120,
    marginTop: 30,
  },
  outerview: {
    backgroundColor: core.theme.colors.primary,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    height: 80,
    width: 412,
    flexDirection: 'row',
  },
  menu: {alignItems: 'flex-start', marginTop: 35, marginStart: 30},
  bartext: {
    fontSize: 15,
    marginStart: 120,
    marginTop: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: core.theme.colors.surface,
  },
  logo: {height: 100, width: 100, alignSelf: 'center', marginTop: 20},
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: core.theme.colors.secondary,
    marginTop: 20,
  },
  innerview: {alignItems: 'center', marginTop: 20},
  input1: {
    backgroundColor: core.theme.colors.surface,
    width: 300,
    paddingBottom: 10,
  },
  input2: {
    backgroundColor: core.theme.colors.surface,
    width: 300,
  },
  touchable: {
    marginTop: 24,
    width: 100,
    marginStart: 200,
    backgroundColor: core.theme.colors.primary,
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
  },
  textbutton: {
    color: core.theme.colors.surface,
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 17,
  },
  contact: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 100,
    marginStart: 50,
    color: core.theme.colors.secondary,
  },
  view: {marginStart: 60, marginTop: 20, flexDirection: 'row'},
  contacttext: {fontWeight: 'bold'},
});
