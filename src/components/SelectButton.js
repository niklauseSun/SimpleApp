import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { px } from '../utils'

class SelectButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelect: false
    };
  }

  componentDidMount() {
  }

  render() {
    const { title = "title", index, selectIndex, changeSelectIndex, style } = this.props
    const isSelect = index === selectIndex
    const isSelectBorderColor = isSelect ? '#123D70': '#CCCCCC'
    const isSelectBgColor = isSelect ? 'rgba(18,61,112,0.20)': '#FFF'
    const isSelectTitle = isSelect ? '#123D70': '#333'
    return <TouchableOpacity onPress={() => {
      changeSelectIndex(index)
    }} style={[styles.container, { borderColor: isSelectBorderColor, backgroundColor: isSelectBgColor }, style]}>
      <Text style={[styles.title, { color: isSelectTitle }]}>
          {title}
        </Text>
      </TouchableOpacity>;
  }

  test() { }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: px(1),
    borderRadius: px(8),
    height: px(64)
  },
  title: {
    marginLeft: px(24),
    marginRight: px(24),
    marginTop: px(12),
    marginBottom: px(12)
  }
});

export default SelectButton;
