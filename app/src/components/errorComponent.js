import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import { Button } from 'react-native-elements'

export default class ErrorComponent extends Component {
  render() {
    let msg = this.props.message.toLowerCase().includes('network request failed')
      ? 'Can not access network. Please check your Internet connection and retry.'
      : `Error occured:\n${this.props.message}`;
    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 10 }}> {msg} </Text>
        <Button
          raised
          onPress={() => this.props.retry()}
          icon={{ name: 'cached' }}
          title='Retry' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});