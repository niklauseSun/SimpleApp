import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { px } from '../utils'

class LineView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return <View  style={styles.container}/>
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBEBEB",
    width: px(654),
    marginLeft: px(32),
    height: px(1)
  }
});

export default LineView;
