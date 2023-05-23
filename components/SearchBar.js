import React from 'react';
import {Dimensions, Animated} from 'react-native';
import {Container, Input, BoxButtonSearch, SearchIcon} from './SearchBarStyle';

export default function SearchBar({onChangeText}) {
  const animation = new Animated.Value(60);
  const {width} = Dimensions.get('window');

  function onSearch() {
    Animated.spring(animation, {
      toValue: width * 0.75,
      useNativeDriver: false,
    }).start();
  }
  function onCancel() {
    Animated.spring(animation, {
      toValue: width * 0.11,
      useNativeDriver: false,
    }).start();
  }

  return (
    <Container style={{width: animation}}>
      <Input autoFocus placeholder="Enter a Date" onChangeText={onChangeText} />
      <BoxButtonSearch onPress={onSearch} onLongPress={onCancel}>
        <SearchIcon />
      </BoxButtonSearch>
    </Container>
  );
}
