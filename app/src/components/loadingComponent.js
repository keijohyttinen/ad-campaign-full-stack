import React, { Component } from 'react'
import { 
  Text, 
  View,
  StyleSheet 
} from 'react-native'

export default class LoadingComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> {this.props.message} </Text>
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