import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { px } from '../utils'
import { AssetImages } from "../constants";

class template extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const { isSelect=true, changeSelectStatus, style } = this.props
    return <TouchableOpacity
      onPress={() => {
        changeSelectStatus(!isSelect)
      }}
      style={[styles.container, style]}>
      <Image
        style={{ width: px(28), height: px(28)}}
        source={isSelect ? AssetImages.ICON_PWD_SELECT : AssetImages.ICON_PWD_UN_SELECT }
      />
    </TouchableOpacity>;
  }

  test() { }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: px(4)
  }
});

export default template;
