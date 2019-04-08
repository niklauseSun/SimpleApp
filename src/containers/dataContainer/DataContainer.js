import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, LayoutAnimation, FlatList, Dimensions, DeviceEventEmitter, RefreshControl, WebView } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import { NavHeader, TitleItem, LineView, MedicineListCell, TabButton, EmptyView, ListFootComponent, SpinnerLoadView } from '../../components'
import { px, ToastUtil } from '../../utils';
import { ActionTypes } from '../../constants';
import { connect } from 'react-redux';
import { E } from '../../config'

const webUrl = "http://localhost:3100/index.html"

class DataContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectTab: 0,
      beginCalculateData: null,
      adjustCalculateData: null,
      predictDoseData: null,
      adjustPredictDoseData: null,

      beginTotalPage: null,
      beginPageIndex: 1,

      adjustPageIndex: 1,
      adjustTotalPage: null,

      predictDoseTotalPage: null,
      predictDosePageIndex: 1,

      adjustPredictDoseTotalPage: null,
      adjustPredictDosePageIndex: 1,

      refreshing: true
    };
  }

  componentDidMount() {
    this.startLoadBeginCalculateData()
    this.startLoadAdjustCalculateData()
    this.startLoadPredictDoseData()
    this.startLoadAdjustPredictDoseData()
    this.listener = DeviceEventEmitter.addListener('logoutListener', (e) => {
      this.setState({
        beginCalculateData: [],
        adjustCalculateData: [],
        predictDoseData: [],
        adjustPredictDoseData: []
      })
    })

    this.dataAdjust = DeviceEventEmitter.addListener('dataAdjust', (e) => {
      this.startLoadBeginCalculateData()
      this.startLoadAdjustCalculateData()
      this.startLoadPredictDoseData()
      this.startLoadAdjustPredictDoseData()
    })
  }

  render() {
    const title = E.IS_IOS ? '已记录数据': '数据'
    return (
      <SafeAreaView style={styles.container}>
        <NavHeader title={title} />
        <View style={{ flexDirection: 'row', width: '100%'}}>
          <TabButton title="初始剂量" index={0} selectIndex={this.state.selectTab} changeSelectIndex={this.changeTab.bind(this)} />
          <TabButton title="调整剂量" index={1} selectIndex={this.state.selectTab} changeSelectIndex={this.changeTab.bind(this)} />
          <TabButton title="初始浓度" index={2} selectIndex={this.state.selectTab} changeSelectIndex={this.changeTab.bind(this)} />
          <TabButton title="调整浓度" index={3} selectIndex={this.state.selectTab} changeSelectIndex={this.changeTab.bind(this)} />
        </View>
        <View style={{ flex: 1, marginTop: px(36)}}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ width: Dimensions.get('window').width * 4 , height: '100%' }}
            pagingEnabled={true}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            onScroll={this._onScroll.bind(this)}
            ref={(c) => this._scroll = c}
            >
            <View style={{ width: Dimensions.get('window').width, height: '100%'}}>
              {this.renderBeginCalculate()}
            </View>
            <View style={{ width: Dimensions.get('window').width, height: '100%' }}>
              {this.renderAdjustCalculate()}
            </View>
            <View style={{ width: Dimensions.get('window').width, height: '100%' }}>
              {this._renderPredictDose()}
            </View>
            <View style={{ width: Dimensions.get('window').width, height: '100%' }}>
              {this._renderAdjustPredictDose()}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }

  mainInfoView(type) {
    if (type === 1) {
      return (
        <View style={styles.itemMainInfo}>
          <View style={styles.itemInfoRow}>
            <Text style={styles.itemInfoTitle}>剂量</Text>
            <Text style={styles.itemInfoSubTitle}>50mg</Text>
          </View>
          <View style={styles.itemInfoRow}>
            <Text style={styles.itemInfoTitle}>给药间隔</Text>
            <Text style={styles.itemInfoSubTitle}>4hrs</Text>
          </View>
          <View style={styles.itemInfoRow}>
            <Text style={styles.itemInfoTitle}>输注时间</Text>
            <Text style={styles.itemInfoSubTitle}>4hrs</Text>
          </View>
          <View style={styles.itemInfoRow}>
            <Text style={styles.itemInfoTitle}>测定谷浓度</Text>
            <Text style={styles.itemInfoSubTitle}>2.5mg/L</Text>
          </View>
          <View style={styles.itemInfoRow}>
            <Text style={styles.itemInfoTitle}>目标谷浓度范围</Text>
            <Text style={styles.itemInfoSubTitle}>10-15mg/L</Text>
          </View>
          <View style={styles.itemInfoRow}>
            <Text style={styles.itemInfoTitle}>MIC</Text>
            <Text style={styles.itemInfoSubTitle}>0.5mg/L</Text>
          </View>
          <View style={styles.itemInfoRow}>
            <Text style={styles.itemInfoTitle}>输注速率</Text>
            <Text style={styles.itemInfoSubTitle}>32mg/h</Text>
          </View>
        </View>
      )
    } else {
      return <View style={styles.itemMainInfo}>
          <View style={styles.itemInfoRow}>
            <Text style={styles.itemInfoTitle}>年龄</Text>
            <Text style={styles.itemInfoSubTitle}>48岁</Text>
            <Text style={[styles.itemInfoTitle, styles.flexTwo]}>
              血肌酐
            </Text>
            <Text style={[styles.itemInfoSubTitle,styles.flexTwo]}>20μmoI/L</Text>
          </View>
          <View style={styles.itemInfoRow}>
            <Text style={styles.itemInfoTitle}>性别</Text>
            <Text style={styles.itemInfoSubTitle}>男</Text>
            <Text style={[styles.itemInfoTitle, styles.flexTwo]}>
              目标谷浓度范围
            </Text>
            <Text style={[styles.itemInfoSubTitle,styles.flexTwo]}>10-15mg/L</Text>
          </View>
          <View style={styles.itemInfoRow}>
          <Text style={styles.itemInfoTitle}>身高</Text>
            <Text style={styles.itemInfoSubTitle}>1.7m</Text>
            <Text style={[styles.itemInfoTitle, styles.flexTwo]}>
              输注时间
            </Text>
            <Text style={[styles.itemInfoSubTitle,styles.flexTwo]}>0.5mg/L</Text>
          </View>
          <View style={styles.itemInfoRow}>
          <Text style={styles.itemInfoTitle}>体重</Text>
          <Text style={styles.itemInfoSubTitle}>72kg</Text>
            <Text style={[styles.itemInfoTitle, styles.flexTwo]}>
              测定谷浓度
            </Text>
            <Text style={[styles.itemInfoSubTitle,styles.flexTwo]}>32mg/h</Text>
          </View>
        </View>;
    }
  }

  renderBeginCalculate() {
    if (this.state.beginCalculateData == null) {
      return null
    }

    if (E.IS_IOS) {
      return <WebView
        ref='webviewBegin'
        onLoadEnd={() => {
          console.log('load end', this.refs.webview)
          this.refs.webviewBegin.postMessage(`${0};${global.SessionID};${global.globalServer}`)
        }}
        javaScriptEnabled={true}
        style={{ flex: 1, width: px(750) }}
        source={{ uri: webUrl }} />
      // return <WebView
      //   injectJavaScript={
      //     `window.dataIndex = '1';
      //     window.sessionId = ${global.SessionID}
      //     window.server = ${global.globalServer}
      //     `
      //   }
      //   style={{ flex: 1, width: px(718) }} source={{ uri: 'https://wangu.91xiaoapp.com/App.Web/index.html' }} />
    }

    if (this.state.beginCalculateData.length == 0) {
      return <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: '#eaeaea', textAlign: 'center'}}>~~ 暂无数据 ~~</Text>
        <TouchableOpacity
          onPress={() => {
            if (!this.props.isLogin) {
              ToastUtil.message('需要登录后查看！')
              this.props.navigation.navigate('Login')
              return;
            }
            // console.log('begin reload')
            this.startLoadBeginCalculateData()
          }}
          activeOpacity={0.7}
          style={{width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: px(42)}}>
          <View style={{ width: px(160), height: px(60), borderRadius: px(8), borderWidth: px(1), borderColor: '#999', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#eaeaea' }}>刷新试试</Text>
          </View>
        </TouchableOpacity>
      </View>
    }

    return <FlatList
      contentContainerStyle={{
        alignItems: 'center'
      }}
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefreshBegin.bind(this)}
        />
      }
      data={this.state.beginCalculateData}
      onEndReached={this.loadMoreBeginCalculateData.bind(this)}
      ListFooterComponent={ <ListFootComponent />}
      renderItem={({ item }) => <MedicineListCell isVersion={!E.IS_IOS} data={item} />}
    />
  }

  renderAdjustCalculate() {
    if (this.state.adjustCalculateData == null) {
      return null
    }

    if (E.IS_IOS) {
      return <WebView
        ref='webviewAdjust'
        onLoadEnd={() => {
          console.log('load end', this.refs.webview)
          this.refs.webviewAdjust.postMessage(`${1};${global.SessionID};${global.globalServer}`)
        }}
        javaScriptEnabled={true}
        style={{ flex: 1, width: px(750) }}
        source={{ uri: webUrl }} />
    }

    if (this.state.adjustCalculateData.length == 0) {
      return <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#eaeaea' }}>暂无数据~~</Text>
        <TouchableOpacity
          onPress={() => {
            if (!this.props.isLogin) {
              ToastUtil.message('需要登录后查看！')
              this.props.navigation.navigate('Login')
              return;
            }
            this.startLoadAdjustCalculateData()
            }}
          activeOpacity={0.7}
          style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: px(42) }}>
          <View style={{ width: px(160), height: px(60), borderRadius: px(8), borderWidth: px(1), borderColor: '#999', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#eaeaea' }}>刷新试试</Text>
          </View>
        </TouchableOpacity>
      </View>
    }
    return <FlatList
      contentContainerStyle={{
        alignItems: 'center'
      }}
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefreshBegin.bind(this)}
        />
      }
      data={this.state.adjustCalculateData}
      onEndReached={this.loadMoreBeginCalculateData.bind(this)}
      renderItem={({ item }) => <MedicineListCell isVersion={!E.IS_IOS} data={item} />}
    />
  }

  _renderPredictDose() {
    if (this.state.predictDoseData == null) {
      return null
    }

    if (E.IS_IOS) {
      console.log('rednerPredictDose', global.SessionID)
      return <WebView
        ref='webviewPredict'
        onLoadEnd={() => {
          // console.log('load end', this.refs.webview, global.SessionID, global.globalServer)
          this.refs.webviewPredict.postMessage(`${3};${global.SessionID};${global.globalServer}`)
        }}
        javaScriptEnabled={true}
        style={{ flex: 1, width: px(750) }}
        source={{ uri: webUrl }} />
    }

    if (this.state.predictDoseData.length == 0) {
      return <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#eaeaea' }}>暂无数据~~</Text>
        <TouchableOpacity
          onPress={() => {
            if (!this.props.isLogin) {
              ToastUtil.message('需要登录后查看！')
              this.props.navigation.navigate('Login')
              return;
            }
            this.startLoadPredictDoseData()
          }}
          activeOpacity={0.7}
          style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: px(42) }}>
          <View style={{ width: px(160), height: px(60), borderRadius: px(8), borderWidth: px(1), borderColor: '#999', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#eaeaea' }}>刷新试试</Text>
          </View>
        </TouchableOpacity>
      </View>
    }
    return <FlatList
      contentContainerStyle={{
        alignItems: 'center'
      }}
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefreshPredictDose.bind(this)}
        />
      }
      data={this.state.predictDoseData}
      onEndReached={this.loadMorePredictDoseData.bind(this)}
      renderItem={({ item }) => <MedicineListCell isVersion={!E.IS_IOS} data={item} />}
    />
  }

  _renderAdjustPredictDose() {
    if (this.state.adjustPredictDoseData == null) {
      return null
    }

    if (E.IS_IOS) {
      return <WebView
        ref='webviewAdjustPredict'
        onLoadEnd={() => {
          console.log('load end', this.refs.webview)
          this.refs.webviewAdjustPredict.postMessage(`${2};${global.SessionID};${global.globalServer}`)
        }}
        javaScriptEnabled={true}
        style={{ flex: 1, width: px(750) }}
        source={{ uri: webUrl }} />
    }

    if (this.state.adjustPredictDoseData.length == 0) {
      return <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#eaeaea' }}>暂无数据~~</Text>
        <TouchableOpacity
          onPress={() => {
            if (!this.props.isLogin) {
              ToastUtil.message('需要登录后查看！')
              this.props.navigation.navigate('Login')
              return;
            }
            this.startLoadAdjustPredictDoseData()
          }}
          activeOpacity={0.7}
          style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: px(42) }}>
          <View style={{ width: px(160), height: px(60), borderRadius: px(8), borderWidth: px(1), borderColor: '#999', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#eaeaea' }}>刷新试试</Text>
          </View>
        </TouchableOpacity>
      </View>
    }
    return <FlatList
      contentContainerStyle={{
        alignItems: 'center'
      }}
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefreshAdjustDose.bind(this)}
        />
      }
      data={this.state.adjustPredictDoseData}
      onEndReached={this.loadMoreAdjustPredictDoseData.bind(this)}
      renderItem={({ item }) => <MedicineListCell isVersion={!E.IS_IOS} data={item} />}
    />
  }

  _onScroll(event) {
    const width = Dimensions.get('window').width
    if (event.nativeEvent.contentOffset.x === 0) {
      this.setState({
        selectTab: 0
      })
    } else if (event.nativeEvent.contentOffset.x == width) {
      this.setState({
        selectTab: 1
      })
    } else if (event.nativeEvent.contentOffset.x == width * 2) {
      this.setState({
        selectTab: 2
      })
    } else if (event.nativeEvent.contentOffset.x == width * 3) {
      this.setState({
        selectTab: 3
      })
    }
  }

  _onRefreshBegin() {
    this.startLoadBeginCalculateData()
  }
  _onRefreshAdjust() {
    this.startLoadBeginCalculateData()
  }

  _onRefreshPredictDose() {
    this.startLoadPredictDoseData()
  }

  _onRefreshAdjustDose() {
    this.startLoadAdjustPredictDoseData()
  }

  // action
  changeTab(index) {
    this.setState({
      selectTab: index
    })
    if (index == 0) {
      this._scroll.scrollTo({ x: 0, y: 0, animated: true })
    } else if (index == 1){
      this._scroll.scrollTo({ x: Dimensions.get('window').width, y: 0, animated: true })
    } else if (index == 2) {
      this._scroll.scrollTo({ x: Dimensions.get('window').width * 2, y: 0, animated: true })
    } else if (index == 3) {
      this._scroll.scrollTo({ x: Dimensions.get('window').width * 3, y: 0, animated: true })
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }

  // load data
  startLoadBeginCalculateData() {
    const data = {
      pageIndex: 1,
      pageSize: 10,
      CalcType: 0 // 初始计算
    }
    const callBack = this.loadBeginCalculateDataSuccess.bind(this)
    const loadType = 0
    actionUtil(ActionTypes.QUERY_SOLUTIONS, { callBack, loadType, data })
    SpinnerLoadView.show()
  }

  loadMoreBeginCalculateData() {
    if (this.state.beginPageIndex > this.state.beginTotalPage) {
      return;
    }
    const data = {
      pageIndex: this.state.beginPageIndex,
      pageSize: 10,
      CalcType: 0 // 初始计算
    }
    const callBack = this.loadBeginCalculateDataSuccess.bind(this)
    const loadType = 1
    actionUtil(ActionTypes.QUERY_SOLUTIONS, { callBack, loadType, data })
    SpinnerLoadView.show()
  }

  loadBeginCalculateDataSuccess(loadType, data, error) {
    SpinnerLoadView.hide()
    const { Data, Page } = data
    this.setState({
      refreshing: false
    })

    if (loadType === 0) {
      if (Data) {
        this.setState({
          beginCalculateData: [...Data],
          beginTotalPage: Page.TotalPage,
          beginPageIndex: Page.PageIndex + 1
        })
      } else {
        this.setState({
          beginCalculateData: []
        })
      }
    } else {
      if (Data) {
        this.setState({
          beginCalculateData: [...this.state.beginCalculateData, ...Data],
          beginPageIndex: Page.PageIndex + 1
        })
      }
    }
  }

  startLoadAdjustCalculateData() {
    const data = {
      pageIndex: 1,
      pageSize: 10,
      CalcType: 1 // 调整计算
    }
    const callBack = this.loadAdjustCalculateDataSuccess.bind(this)
    const loadType = 0
    actionUtil(ActionTypes.QUERY_SOLUTIONS, { callBack, loadType, data })
    SpinnerLoadView.show()
  }

  loadMoreAdjustCalculateData() {
    if (this.state.adjustPageIndex > this.state.adjustTotalPage) {
      return;
    }
    const data = {
      pageIndex: this.state.adjustPageIndex,
      pageSize: 10,
      CalcType: 1 // 调整计算
    }
    const callBack = this.loadAdjustCalculateDataSuccess.bind(this)
    const loadType = 1
    actionUtil(ActionTypes.QUERY_SOLUTIONS, { callBack, loadType, data })
    SpinnerLoadView.show()
  }

  loadAdjustCalculateDataSuccess(loadType, data, error) {
    SpinnerLoadView.hide()
    const { Data, Page } = data
    this.setState({
      refreshing: false
    })
    if (loadType === 0) {
      if (Data) {
        this.setState({
          adjustCalculateData: Data,
          adjustTotalPage: Page.TotalPage,
          adjustPageIndex: Page.PageIndex + 1
        })
      } else {
        this.setState({
          adjustCalculateData: []
        })
      }
    } else {
      if (Data) {
        this.setState({
          adjustCalculateData: [this.state.adjustCalculateData, ...Data],
          adjustPageIndex: Page.PageIndex + 1
        })
      }
    }
  }

  startLoadPredictDoseData() {
    const data = {
      pageIndex: 1,
      pageSize: 10,
      CalcType: 3 // 初始浓度
    }
    const callBack = this.loadPredictDoseSuccess.bind(this)
    const loadType = 0
    actionUtil(ActionTypes.QUERY_SOLUTIONS, { callBack, loadType, data })
    SpinnerLoadView.show()
  }

  loadMorePredictDoseData() {
    if (this.state.predictDosePageIndex > this.state.predictDoseTotalPage) {
      return;
    }
    const data = {
      pageIndex: this.state.predictDosePageIndex,
      pageSize: 10,
      CalcType: 3 // 调整计算
    }
    const callBack = this.loadPredictDoseSuccess.bind(this)
    const loadType = 1
    actionUtil(ActionTypes.QUERY_SOLUTIONS, { callBack, loadType, data })
    SpinnerLoadView.show()
  }

  loadPredictDoseSuccess(loadType, data, error) {
    SpinnerLoadView.hide()
    const { Data, Page } = data
    this.setState({
      refreshing: false
    })
    if (loadType === 0) {
      if (Data) {
        this.setState({
          predictDoseData: Data,
          predictDoseTotalPage: Page.TotalPage,
          predictDosePageIndex: Page.PageIndex + 1
        })
      } else {
        this.setState({
          predictDoseData: []
        })
      }
    } else {
      if (Data) {
        this.setState({
          predictDoseData: [this.state.predictDoseData, ...Data],
          predictDosePageIndex: Page.PageIndex + 1
        })
      }
    }
  }

  startLoadAdjustPredictDoseData() {
    const data = {
      pageIndex: 1,
      pageSize: 10,
      CalcType: 2 // 初始浓度
    }
    const callBack = this.loadAdjustPredictDoseSuccess.bind(this)
    const loadType = 0
    actionUtil(ActionTypes.QUERY_SOLUTIONS, { callBack, loadType, data })
    SpinnerLoadView.show()
  }

  loadMoreAdjustPredictDoseData() {
    if (this.state.predictDosePageIndex > this.state.predictDoseTotalPage) {
      return;
    }
    const data = {
      pageIndex: this.state.adjustPredictDosePageIndex,
      pageSize: 10,
      CalcType: 2 // 调整计算
    }
    const callBack = this.loadAdjustPredictDoseSuccess.bind(this)
    const loadType = 1
    actionUtil(ActionTypes.QUERY_SOLUTIONS, { callBack, loadType, data })
    SpinnerLoadView.show()
  }

  loadAdjustPredictDoseSuccess(loadType, data, error) {
    SpinnerLoadView.hide()
    const { Data, Page } = data
    this.setState({
      refreshing: false
    })
    if (loadType === 0) {
      if (Data) {
        this.setState({
          adjustPredictDoseData: Data,
          adjustPredictDoseTotalPage: Page.TotalPage,
          adjustPredictDosePageIndex: Page.PageIndex + 1
        })
      } else {
        this.setState({
          adjustPredictDoseData: []
        })
      }
    } else {
      if (Data) {
        this.setState({
          adjustPredictDoseData: [this.state.adjustPredictDoseData, ...Data],
          adjustPredictDosePageIndex: Page.PageIndex + 1
        })
      }
    }
  }

  componentWillUnmount() {
    this.listener.remove();
    this.dataAdjust.remove();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#123D70"
  },
  content: {
    flex: 1
  },
  listView: {
    flex: 1,
    alignItems: "center"
  },
  itemView: {
    backgroundColor: "#fff",
    width: px(686),
    borderRadius: px(8)
  },
  itemHeader: {
    height: px(132),
    justifyContent: "center"
  },
  itemTitle: {
    fontSize: px(36),
    marginLeft: px(32)
  },
  paramHeader: {
    marginTop: px(24),
    height: px(94),
    justifyContent: "center"
  },
  paramTitle: {
    color: "#333",
    fontSize: px(32),
    marginLeft: px(32)
  },
  programHeader: {
    height: px(94),
    marginTop:px(24),
    justifyContent: "center"
  },
  programTitle: {
    color: "#333",
    fontSize: px(32),
    marginLeft: px(32)
  },
  itemMainInfo: {
    paddingBottom: px(50)
  },
  paramView: {
    paddingBottom: px(50)
  },
  itemInfoRow: {
    flexDirection: "row",
    height: px(52),
    alignItems: "center"
  },
  itemInfoTitle: {
    flex: 1,
    fontSize: px(28),
    color: "#999",
    marginLeft: px(32)
  },
  itemInfoSubTitle: {
    flex: 1,
    fontSize: px(28),
    color: "#666"
  },
  itemRow: {
    flexDirection: "row",
    paddingTop: px(24),
    paddingBottom: px(24)
  },
  titleItem: {
    flex: 1,
    marginLeft: px(32)
  },
  flexTwo: {
    flex: 3,
  }
});

export default connect(state => ({
  isLogin: state.login.isLogin,
  willReload: state.login.willReload
})
)(DataContainer)