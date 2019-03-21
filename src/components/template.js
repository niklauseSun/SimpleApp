import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { px } from '../utils'

class template extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return <View style={styles.container}>
        <Text>template</Text>
      </View>;
  }

  test() { }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default template;
