import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { px } from '../utils'

class BlueButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { title = "按钮", backgroundStyle, textStyle, activeOpacity = 0.6, onPress, height = px(80) } = this.props;
    return <TouchableOpacity
      onPress={() => {
        onPress()
      }}
      style={[styles.bgStyle, backgroundStyle, { height: height}]} activeOpacity={activeOpacity}>
        <Text style={[styles.titleStyle, textStyle]}>{title}</Text>
      </TouchableOpacity>;
  }
}

const styles = StyleSheet.create({
  bgStyle: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: px(20),
    marginRight: px(20),
    borderRadius: px(8)
  },
  titleStyle: {
    color: "#123D70",
    fontSize: px(36)
  }
});

export default BlueButton;
