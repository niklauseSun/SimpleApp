import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, LayoutAnimation } from "react-native";
import { px } from '../utils'

class LineInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelect: false
    };
  }

  componentDidMount() {
  }

  render() {
    const { placeholder = "请输入", style, onChangeText, inputValue, keyboardType, secureTextEntry = false } = this.props
    const opacity = this.state.isSelect ? 1: 0.1
    return <View style={[styles.container, style]}>
        <TextInput
          onFocus={() => {
            this.setState({ isSelect: true });
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
          }}
          onBlur={() => {
            this.setState({ isSelect: false });
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          }}
          style={{ color: "#FFF", fontSize: px(32), width: px(686) }}
          placeholder={placeholder}
          placeholderTextColor={'#999'}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          value={inputValue}/>
        <View style={{ width: px(686), marginTop: px(8), height: px(1), backgroundColor: "#fff", opacity: opacity }} />
      </View>;
  }

  test() { }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default LineInput;
