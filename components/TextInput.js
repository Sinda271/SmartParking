import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput as Input} from 'react-native-paper';
import core from '../core';

export default function TextInput({errorText, description, ...props}) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={core.theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: core.theme.colors.surface,
  },
  description: {
    fontSize: 13,
    color: core.theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: core.theme.colors.error,
    paddingTop: 8,
  },
});
