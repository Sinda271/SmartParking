import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import DatePicker from 'react-native-datepicker';
import core from '../core';

export default class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {date: ''};
  }

  render() {
    return (
      <DatePicker
        style={styles.datepicker}
        date={this.state.date}
        mode="date"
        placeholder="Pick a date"
        placeholderTextColor="#808080"
        format="YYYY-MM-DD"
        minDate="2021-01-01"
        maxDate="2021-12-30"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
            overlayColor: core.theme.colors.primary,
          },
          dateInput: {
            marginLeft: 36,
            borderRadius: 10,
            borderColor: '#A9A9A9',
          },
        }}
        onDateChange={date => {
          this.setState({date: date});
        }}
      />
    );
  }
}
const styles = StyleSheet.create({
  datepicker: {
    width: 200,
    paddingLeft: 10,
  },
});
