import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { px } from '../utils'

class EmptyView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return <View style={styles.container}>
      <Text style={styles.title}>暂无数据~~</Text>
    </View>;
  }

  test() { }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#123D70",
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: '100%'
  },
  title: {
    color: '#999',
    fontSize: px(36)
  }
});

export default EmptyView;
