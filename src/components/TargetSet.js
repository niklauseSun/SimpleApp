import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { px } from '../utils'

class TargetSet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>TargetSet</Text>
      </View>
    );
  }

  test() { }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#123D70",
  }
});

export default TargetSet;
