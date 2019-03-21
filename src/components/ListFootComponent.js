import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { px } from '../utils'

class ListFootComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#eaeaea'}}>没有更多了</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: px(60),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: px(1)
  }
})

export default ListFootComponent;
