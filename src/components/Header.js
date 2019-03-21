import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { px } from '../utils'
import { AssetImages } from "../constants";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    const { title = "测试", showBackButton = false, rightButton = null, } = this.props
    return <View style={[styles.container, { height: px(88) }]}>
        <TouchableOpacity onPress={() => {
            this.props.navigation.goBack();
          }} style={{ display: showBackButton ? "flex" : "none", flex: 1, alignItems: "center", height: '100%', justifyContent: 'center' }}>
          <Image source={AssetImages.BACK_ICON} />
        </TouchableOpacity>
        <Text
          style={styles.title}
        >
          {title}
        </Text>
        <View
          style={[
            styles.rightButton,
            { display: showBackButton ? "flex" : "none" }
          ]}
        >
          {rightButton}
        </View>
      </View>;
  }

  test() { }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#123D70",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  rightButton: {
    flex: 1,
    display: 'none',
  },
  title: {
    color: "#fff",
    fontSize: px(38),
    flex: 5,
    textAlign: "center"
  }
});

export default Header;
