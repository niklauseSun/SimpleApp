import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { px } from '../utils'

class GenderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const { isMan = true, changeGender } = this.props
    const manBgColor = isMan ? '#123D70': '#fff'
    const manBgTitle = isMan ? '#fff': '#123D70'
    const womanBgColor = isMan ? '#fff': '#123D70'
    const womanBgTitle = isMan ? '#123D70': '#fff'
    return <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          changeGender(true)
        }}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: manBgColor ,borderTopLeftRadius: px(8), borderBottomLeftRadius: px(8) }}>
        <Text style={{ color: manBgTitle }}>男</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          changeGender(false)
        }}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: womanBgColor, borderTopRightRadius: px(8), borderBottomRightRadius: px(8)}}>
        <Text style={{ color: womanBgTitle }}>女</Text>
      </TouchableOpacity>
    </View>;
  }

  test() { }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: px(2),
    borderStyle: 'solid',
    borderColor: '#123D70',
    width: px(200),
    height: px(56),
    borderRadius: px(8),
    flexDirection: 'row'
  }
});

export default GenderButton;
