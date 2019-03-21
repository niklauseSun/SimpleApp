import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { px } from '../utils'

class InputItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const { title } = this.props;
    return <View style={styles.container}>
      <Text>{title}</Text>
    </View>;
  }

  test() { }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    height: px(112),
    borderRadius: px(8)
  }
});

export default InputItem;
