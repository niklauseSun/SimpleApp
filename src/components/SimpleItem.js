import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { px } from '../utils'

class SimpleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const { title, rightView = null, subTitle = null } = this.props
    return <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.rightViewStyle}>{rightView}</View>
        <Text style={styles.subTitle}>{subTitle}</Text>
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
  },
  title: {
    fontSize: px(32),
    color: "#333333",
    flex: 1,
    marginLeft: px(32)
  },
  rightViewStyle: {
    width: px(300),
    height: '100%'
  },
  subTitle: {
    color: '#999999',
    marginRight: px(32),
    fontSize: px(32)
  }
});

export default SimpleItem;
