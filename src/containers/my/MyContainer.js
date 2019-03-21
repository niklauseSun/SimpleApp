import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import { NavHeader, SimpleItem, LineView, BlueButton } from '../../components'
import { AssetImages } from '../../constants';
import { px } from '../../utils';
import { connect } from 'react-redux';

class MyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    if (this.props.isLogin) {
      const { userInfo } = this.props
      return <SafeAreaView style={styles.container}>
        <NavHeader title="我" />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Image style={styles.headImage} source={userInfo.Sex === 1 ? AssetImages.ICON_HEAD_MAN: AssetImages.ICON_HEAD_WOMAN} />
            <Text style={styles.doctorName}>{userInfo.UserName}</Text>
          </View>
          <View style={styles.hospital}>
            <SimpleItem title="医院" subTitle={userInfo.Hospital} />
            <LineView />
            <SimpleItem title="科室" subTitle={userInfo.Department} />
          </View>
          <View style={styles.phoneView}>
            <SimpleItem title="手机号" subTitle={userInfo.UserCellPhone} />
            <LineView />
            {this.subWxView(userInfo.WeixinAccount)}
            <LineView />
            <SimpleItem title="修改密码" rightView={this.rightButton(0)} />
          </View>
          <View style={styles.setView}>
            <SimpleItem title="设置" rightView={this.rightButton(1)} />
          </View>
        </ScrollView>
      </SafeAreaView>;
    }
    return <SafeAreaView style={styles.container}>
        <NavHeader title="我" />
      <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Image style={styles.headImage} source={AssetImages.ICON_HEAD_MAN}/>
            <Text style={styles.doctorName}>未登录</Text>
          </View>
          <View style={styles.hospital}>
          <SimpleItem title="医院" subTitle="..."/>
            <LineView />
          <SimpleItem title="科室" subTitle="..."/>
          </View>
          <View style={styles.phoneView}>
          <SimpleItem title="手机号" subTitle="..."/>
            <LineView />
          <SimpleItem title="微信号" subTitle="..."/>
              <LineView />
          <SimpleItem title="修改密码" subTitle="..."/>
          </View>
          <View style={styles.setView}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => {
                this.props.navigation.navigate('Login')
              }}
            >
              <Text style={{ fontSize: px(42), color: '#123D70' }}>登录</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
      </SafeAreaView>;
  }

  rightButton(type) {
    return <TouchableOpacity
      onPress={() => {
        if (type == 0) {
          this.props.navigation.navigate("EditPassword");
        } else {
          this.props.navigation.navigate("Logout")
        }
      }}
      style={{ alignItems: 'flex-end', height:'100%', justifyContent: 'center', marginRight: -5}}
    ><Image style={{ height: px(48), width: px(30) }} source={AssetImages.ICON_MORE}/></TouchableOpacity>
  }

  renderRightView(type) {
    return <View>
      <Text>{type == 0 ? this.props.userInfo.Hospital : this.props.userInfo.Department}</Text>
      <TouchableOpacity
        onPress={() => {

        }}
      >
        <Image source={AssetImages.ICON_MORE} />
      </TouchableOpacity>
    </View>
  }

  subWxView(account) {
    if (account == null || account.length == 0) {
      return <SimpleItem title="微信号" rightView={
          <TouchableOpacity
          style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'flex-end' }}
            onPress={()=> {
            // 绑定微信

          }}>
          <Text style={{ color: '#333'}}>绑定微信</Text>
          </TouchableOpacity>} />
    }
    return <SimpleItem title="微信号" subTitle={account} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#123D70"
  },
  content: {
    alignItems: "center",
    borderRadius: px(8)
  },
  header: {
    marginTop: px(32),
    width: px(686),
    height: px(388),
    borderRadius: px(8),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  headImage: {
    height: px(200),
    width: px(200)
  },
  doctorName: {
    marginTop: px(40),
    fontSize: px(38)
  },
  hospital: {
    marginTop: px(32),
    borderRadius: px(8),
    width: px(686),
    height: px(225),
    backgroundColor: "#fff",
    justifyContent: "center",
    borderTopColor: "#fff"
  },
  phoneView: {
    marginTop: px(32),
    borderRadius: px(8),
    width: px(686),
    height: px(338),
    backgroundColor: "#fff"
  },
  setView: {
    marginTop: px(32),
    borderRadius: px(8),
    width: px(686),
    height: px(112),
    backgroundColor: "#fff"
  }
});

export default connect(state => ({
  isLogin: state.login.isLogin,
  userInfo: state.login.userInfo
})
)(MyContainer)