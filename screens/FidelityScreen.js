import React, {Component} from 'react';
import LottieView from 'lottie-react-native';
import {View, Text, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import core from '../core';

export default class Fidelity extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.textRef.fadeIn(9000);
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>

        <Animatable.View style={styles.footer} animation="fadeInUp">
          <Animatable.View style={styles.innerview} animation="fadeInUp">
            <View>
              <LottieView
                source={core.gift}
                autoPlay
                loop={false}
                speed={1.5}
                paddingVertical={200}
              />
            </View>
            <View style={styles.view1}>
              <Text style={styles.text_footer}>Congratulations !</Text>
            </View>
          </Animatable.View>
        </Animatable.View>
        <View style={styles.footer1}>
          <View style={styles.view2}>
            <Animatable.Text
              style={styles.text_footer0}
              animation="jello"
              duration={2000}>
              You have won
            </Animatable.Text>
            <Animatable.Text
              style={styles.text_footer2}
              animation="fadeInUpBig"
              delay={1500}
              duration={500}>
              10
            </Animatable.Text>
            <Animatable.Text
              style={styles.text_footer1}
              animation="fadeInUpBig"
              delay={1500}
              duration={500}>
              Loyalty Points
            </Animatable.Text>
            <Animatable.Text
              style={styles.text}
              delay={3000}
              ref={el => (this.textRef = el)}
              onPress={() => {
                navigate('DriverHome');
              }}>
              Tap To Continue
            </Animatable.Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: core.theme.colors.primary,
  },

  header: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  footer1: {
    flex: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },

  text_footer: {
    color: '#05375a',
    fontSize: 25,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  text_footer0: {
    color: '#05375a',
    fontSize: 20,

    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  text_footer1: {
    color: '#05375a',
    fontSize: 20,

    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  text_footer2: {
    color: '#05375a',
    fontSize: 25,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  innerview: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  view1: {
    flex: 3,
    alignItems: 'center',
    flexDirection: 'column',
  },
  view2: {
    flex: 3,
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 50,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FECA13',
    alignSelf: 'center',
    marginTop: 20,
  },
});
