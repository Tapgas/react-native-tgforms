/**
 * Tapgas Forms example
 * https://github.com/tapgas/react-native-tgforms
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import {
  FormContext,
  Form,
  Input,
  FormScrollView,
} from 'react-native-tgforms';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    ...Platform.select({
      ios: {
        paddingTop: getStatusBarHeight(),
        height: 56 + getStatusBarHeight(),
      },
      android: {
        height: 56,
      },
    }),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5ECEF',
    justifyContent: 'center',
  },
  footer: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 40,
    borderTopWidth: 1,
    borderTopColor: '#E5ECEF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  footerText: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

export default class App extends Component {

  onSubmit = (data) => {
    console.log(data);
  };

  onError = (validationErrors) => {
    console.log(validationErrors);
  };

  onValidate = (data) => {
    console.log(data);
  };

  render() {
    return (
      <FormContext style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Tapgas Forms</Text>
        </View>
        <Form
          ref={ref => { this.Form = ref;}}
          name="signup"
          onSubmit={this.onSubmit}
          onError={this.onError}
          onValidate={this.onValidate}
          style={styles.body}
        >
          <FormScrollView contentContainerStyle={{ padding: 24 }}>
            <Input name="name" label="Name" next="lastname" />
            <Input name="lastname" label="Lastname" next="date" />

            {/* Datetime inputs */}
            <Input name="date" label="Date" next="time" type="date" />
            <Input name="time" label="Time" next="datetime" type="time" />
            <Input name="datetime" label="Datetime" next="gender"
                   type="datetime" />

            {/* Options Inputs */}
            <Input name="gender" label="Sex" next="email" type="select"
                   options={genders} empty="Select sex"
            />
            <Input name="email" label="E-mail" next="phone" type="email" />
            <Input name="phone" label="phone" next="phone" type="phone"
                   placeholder="(###) ###-####" mask="(999) 999-9999"
                   maxLength={14} />
          </FormScrollView>
        </Form>
        <View style={styles.footer}>
          <Text style={styles.footerText}>https://tapgas.mx</Text>
        </View>
      </FormContext>
    );
  }
}
