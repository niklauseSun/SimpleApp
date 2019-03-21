import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { px } from '../utils'

class TitleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const { title, subTitle, param, style } = this.props
    return <View style={style}>
      <Text style={{ fontSize: px(24), color: '#666666' }}>{title}</Text>
      <View style={{ flexDirection: 'row', marginTop: px(24), alignItems: 'baseline' }}>
        <Text style={{ fontSize: px(32), color: '#333333' }}>{subTitle}</Text>
        <Text style={{ fontSize: px(24), color: '#333333', marginLeft: px(8) }}>{param}</Text>
      </View>
    </View>;
  }

  test() { }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  }
});

export default TitleItem;
