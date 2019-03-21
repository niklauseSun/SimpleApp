import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { px } from '../utils'

class TabButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const { index , selectIndex, title, changeSelectIndex } = this.props
    const isSelect = index === selectIndex
    const bottomLineColor = isSelect ? '#FFF' : '#123D70'
    const textColor = isSelect ? '#FFF': '#999'
    return <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          changeSelectIndex(index)
        }}
        style={styles.button}>
        <View style={styles.titleView}>
          <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        </View>
        <View style={[styles.bottomLine, { backgroundColor: bottomLineColor }]}></View>
      </TouchableOpacity>
    </View>;
  }

  test() { }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: px(92),
    flex: 1,
    backgroundColor: '#123D70',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize: px(28),
  },
  bottomLine: {
    width: px(40),
    height: px(4),
    backgroundColor: 'blue'
  }
});

export default TabButton;
