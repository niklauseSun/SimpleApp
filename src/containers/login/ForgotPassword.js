import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-navigation'
import { NavHeader } from "../../components";
import { px } from "../../utils";
import { ActionTypes } from "../../constants";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Guide: '',
      Name: '',
      CellPhone: '',
      Email: ''
    };
  }

  componentDidMount() {
    this.loadAdminMessage()
  }

  render() {
    return <SafeAreaView style={styles.container}>
      <NavHeader title="忘记密码" showBackButton={true} navigation={this.props.navigation} />
      <View style={styles.content}>
        <Text style={styles.title}>{this.state.Guide}</Text>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>姓名</Text>
          <Text style={styles.subTitle}>{this.state.Name}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>手机号</Text>
          <Text style={styles.subTitle}>{this.state.CellPhone}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>邮箱</Text>
          <Text style={styles.subTitle}>{this.state.Email}</Text>
        </View>
      </View>
    </SafeAreaView>;
  }

  loadAdminMessage() {
    const data = {
    }
    const callBack = this.loadAdminMessageSuccess.bind(this)
    actionUtil(ActionTypes.GET_ADMIN_INFO, { data, callBack })
  }

  loadAdminMessageSuccess( Data, error ) {
    if (Data) {
      const { Guide, Name, CellPhone, Email } = Data
      this.setState({
        Guide: Guide,
        Name: Name,
        CellPhone: CellPhone,
        Email: Email
      })
      return;
    }

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#123D70",
    flex: 1
  },
  content: {
    flex: 1
  },
  title: {
    color: '#fff',
    fontSize: px(32),
    marginTop: px(32),
    marginLeft: px(32)
  },
  item: {
    marginLeft: px(32),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: px(28)
  },
  itemTitle: {
    width: px(100),
    fontSize: px(28),
    color: '#FFF',
    opacity: 0.7,
  },
  subTitle: {
    color :'#fff',
    fontSize: px(28)
  }
});

export default ForgotPassword;
