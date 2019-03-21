import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { px } from '../utils'

class BackButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const { title = "测试" } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity>

        </TouchableOpacity>
      </View>
    )
  }

  test() { }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#123D70",
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default BackButton;
