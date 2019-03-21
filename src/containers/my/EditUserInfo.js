import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
// import { px } from '../utils'
import { SafeAreaView } from 'react-navigation'
import { NavHeader } from "../../components";
import { ActionTypes } from "../../constants";
import { ToastUtil } from "../../utils";


const titles = ['修改用户名', '修改医院', '修改科室']

class EditUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null
    };
  }

  componentDidMount() {
  }

  render() {
    const { type = 0 } = this.props.navigation.state.params || {}
    return <SafeAreaView style={styles.container}>
      <NavHeader title={titles[type]} showBackButtion={true} rightButton={() => this.renderRightButton()} />
      <TextInput placeholder="请输入" onChangeText={(val) => {
        this.setState({
          text: val
        })
      }}/>
    </SafeAreaView>;
  }

  renderRightButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          const { type = 0 } = this.props.navigation.state.params || {}
          if (this.state.text.trim().length == 0) {
            ToastUtil.fail('请输入数据！')
            return;
          }
          switch(type) {
            case 0:
            const data = {
              UserName: this.state.text
            }
            const callBack = this.updateSuccess.bind(this)
            actionUtil(ActionTypes.UPDATE_USERNAME, { data, callBack})
            case 1:
            const data = {
              Hospital: this.state.text
            }
            const callBack = this.updateSuccess.bind(this)
            actionUtil(ActionTypes.UPDATE_USERNAME, { data, callBack})
            case 2:
            const data = {
              Department: this.state.text
            }
            const callBack = this.updateSuccess.bind(this)
            actionUtil(ActionTypes.UPDATE_USERNAME, { data, callBack})
            break;
          }
        }}
      >
        <Text>更新</Text>
      </TouchableOpacity>
    )
  }

  updateSuccess() {
    this.props.navigation.goBack()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#123D70"
  }
});

export default EditUserInfo;
