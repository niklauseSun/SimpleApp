import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView , FlatList, DeviceEventEmitter } from "react-native";
import { SafeAreaView } from 'react-navigation'
import { NavHeader, TitleItem, MedicineResultCell, BlueButton, LineView, SpinnerLoadView, PredictDose } from "../../components";
import { px, ToastUtil } from "../../utils";
import { AssetImages, ActionTypes } from "../../constants";

class CalculateResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectIndex: 0,
      data: null,
      solutionList: [],
      calculateType: 0,
      solution: null,
      Reminds: null
    };
  }

  componentWillMount() {
    const { data = null, type = 0 } = this.props.navigation.state.params || {}
    console.log('componentWillMount', data, type)
    const { Solutions = [], Reminds = null } = data || {}
    this.setState({
      data: data,
      solutionList: Solutions,
      calculateType: type,
      Reminds: Reminds
    })
  }

  componentDidMount() {
  }

  render() {
    return <SafeAreaView style={styles.container}>
        <NavHeader title="计算结果" navigation={this.props.navigation} showBackButton={true} />
        <View style={styles.content}>
        <ScrollView>
          <View style={styles.headView}>
            <View style={styles.cardTitleView}>
              <Text style={styles.cardTitle}>PK参数</Text>
            </View>
            {this.renderPKView(this.state.calculateType)}
          </View>
          <View style={styles.listView}>
            <View style={styles.cardTitleView}>
              <Text style={styles.cardTitle}>给药方案</Text>
            </View>
            {this.renderFlatList(this.state.calculateType)}
          </View>
        </ScrollView>
        </View>
        <View style={styles.foot}>
          {this.renderTips(this.state.Reminds)}
          <Text style={styles.footText}>选择一个最合适的方案保存</Text>
          <BlueButton onPress={() => {
            this.saveSolutionId()
          }} backgroundStyle={{width: px(686)}} height={px(100)} title="保存"/>
        </View>
      </SafeAreaView>;
  }

  renderPKView(type) {
    const { data } = this.state
    switch(type) {
      case 0:
        return <View style={styles.cardPkView}>
          <View style={styles.itemRow}>
            <TitleItem style={styles.titleItem} title="表观分布容积" subTitle={data ? data.V : ''} param="L" />
            <TitleItem style={styles.titleItem} title="清除常数" subTitle={data ? data.K : ''} param="1/h" />
            <TitleItem style={styles.titleItem} title="肌酐清除率" subTitle={data ? data.CrCl : ''} param="mL/min" />
          </View>
          <View style={[styles.itemRow, { marginBottom: px(48) }]}>
            <TitleItem style={styles.titleItem} title="万古霉素清除率" subTitle={data ? data.CL : ''} param="L/h" />
            <TitleItem style={styles.titleItem} title="半衰期" subTitle={data ? data.t1_2 : ''} param="hrs" />
            <TitleItem style={[styles.titleItem, { visibility: 'hidden' }]} title="" subTitle="" param="" />
          </View>
        </View>
      case 1:
        return <View style={styles.cardPkView}>
          <View style={styles.itemRow}>
            <TitleItem style={styles.titleItem} title="表观分布容积" subTitle={data ? data.V : ''} param="L" />
            <TitleItem style={styles.titleItem} title="清除常数" subTitle={data ? data.K : ''} param="1/h" />
            <TitleItem style={styles.titleItem} title="万古霉素清除率" subTitle={data ? data.CL : ''} param="L/h" />
          </View>
          <View style={[styles.itemRow, { marginBottom: px(48) }]}>
            <TitleItem style={styles.titleItem} title="半衰期" subTitle={data ? data.t1_2 : ''} param="hrs" />
            <TitleItem style={styles.titleItem} title="AUC₀₋₂₄/MIC" subTitle={data ? data['AUC0-24/MIC'] : ''} param="" />
            <TitleItem style={[styles.titleItem, { visibility: 'hidden' }]} title="" subTitle="" param="" />
          </View>
        </View>
      case 2:
        return <View style={styles.cardPkView}>
          <View style={styles.itemRow}>
            <TitleItem style={styles.titleItem} title="表观分布容积" subTitle={data ? data.V : ''} param="L" />
            <TitleItem style={styles.titleItem} title="清除常数" subTitle={data ? data.K : ''} param="1/h" />
            <TitleItem style={styles.titleItem} title="肌酐清除率" subTitle={data ? data.CrCl : ''} param="mL/min" />
          </View>
          <View style={[styles.itemRow, { marginBottom: px(48) }]}>
            <TitleItem style={styles.titleItem} title="万古霉素清除率" subTitle={data ? data.CL : ''} param="L/h" />
            <TitleItem style={styles.titleItem} title="半衰期" subTitle={data ? data.t1_2 : ''} param="hrs" />
            <TitleItem style={[styles.titleItem, { visibility: 'hidden' }]} title="" subTitle="" param="" />
          </View>
        </View>
      case 3:
        return <View style={styles.cardPkView}>
          <View style={styles.itemRow}>
            <TitleItem style={styles.titleItem} title="表观分布容积" subTitle={data ? data.V : ''} param="L" />
            <TitleItem style={styles.titleItem} title="清除常数" subTitle={data ? data.K : ''} param="1/h" />
            <TitleItem style={styles.titleItem} title="肌酐清除率" subTitle={data ? data.CrCl : ''} param="mL/min" />
          </View>
          <View style={[styles.itemRow, { marginBottom: px(48) }]}>
            <TitleItem style={styles.titleItem} title="万古霉素清除率" subTitle={data ? data.CL : ''} param="L/h" />
            <TitleItem style={styles.titleItem} title="AUC₀₋₂₄/MIC" subTitle={data ? data['AUC0-24/MIC'] : ''} param="" />
            <TitleItem style={[styles.titleItem, { visibility: 'hidden' }]} title="" subTitle="" param="" />
          </View>
        </View>
    }
  }

  renderFlatList(type) {
    if (type == 0 || type == 1) {
      if (this.state.solutionList.length == 0) return <View style={{ height: px(80), alignItems: 'center', justifyContent: 'center' }}><Text>无方案</Text></View>
      return (
        <FlatList
          backgroundColor="#FFF"
          extraData={this.state.selectIndex}
          data={this.state.solutionList}
          ItemSeparatorComponent={() => <LineView />}
          renderItem={({ item, index }) => <MedicineResultCell
            index={index}
            data={item}
            selectIndex={this.state.selectIndex}
            changeSelectIndex={this.changeSelectIndex.bind(this)} />
          }
        />
      )
    }

    if (type == 2 || type == 3) {
      const { data } = this.state;
      console.log('result', data)
      return (
        <View style={{
          flexDirection: "row",
          marginTop: px(48),
          marginBottom: px(48)}}>
          <TitleItem style={styles.titleItem} title="谷浓度" subTitle={data.Cmin} param="mg/L" />
          <TitleItem style={styles.titleItem} title="峰浓度" subTitle={data.Cmax} param="mg/L" />
          <TitleItem style={styles.titleItem} title="AUC₀₋₂₄/MIC" subTitle={data['AUC24/MIC']} param="" />
        </View>
      )
    }
  }

  renderTips(data) {
    if (data !== null) {
      console.log('Reminds', data)
      return <View style={{ height: px(160), paddingLeft: px(32), paddingRight: px(32), marginBottom: px(56)}}>
      <Text style={{ color: '#ff6565', marginBottom: px(24), fontSize: px(28)}}>提示：</Text>
        <FlatList
          data={data}
          // ItemSeparatorComponent={() => <LineView />}
          renderItem={({ item, index }) => {
            return <View style={{ paddingTop: px(8), height: px(100)}}><Text style={{ color: '#ff6565', fontSize: px(24), lineHeight: px(48)}}>{item}</Text></View>
          }
          }
        />
      </View>
    }
    return null;
  }

  changeSelectIndex(val) {
    this.setState({
      selectIndex: val
    })
  }

  saveSolutionId() {
    if (this.state.calculateType == 0 || this.state.calculateType == 1) {
      if (this.state.selectIndex <= this.state.solutionList.length) {
        // 可以使用
        const { SolutionId } = this.state.solutionList[this.state.selectIndex]
        const data = {
          solutionId: SolutionId
        }
        const callBack = this.saveSolutionSuccess.bind(this)
        actionUtil(ActionTypes.SAVE_SOLUTION_ID, { data, callBack })
        SpinnerLoadView.show()
      }
    } else {
      const { SolutionId } = this.state.data;
      const data = {
        solutionId: SolutionId
      }
      const callBack = this.saveSolutionSuccess.bind(this)
      actionUtil(ActionTypes.SAVE_SOLUTION_ID, { data, callBack })
      SpinnerLoadView.show()
    }
    
  }

  saveSolutionSuccess(data, error) {
    SpinnerLoadView.hide()
    if (!error) {
      ToastUtil.message('保存成功,请前往数据查看！')
      DeviceEventEmitter.emit('dataAdjust')
      this.props.navigation.goBack()
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#123D70"
  },
  content: {
    flex: 1,
    alignItems: "center"
  },
  headView: {
    width: px(686),
    // height: px(404),
    backgroundColor: "#fff",
    borderRadius: px(8),
    marginTop: px(32)
  },
  cardTitleView: {
    justifyContent: "center"
  },
  cardTitle: {
    marginLeft: px(32),
    marginTop: px(48),
    fontSize: px(36),
    color: '#333'
  },
  cardPkView: {
    marginTop: px(16)
  },
  listView: {
    width: px(686),
    backgroundColor: "#fff",
    borderRadius: px(8),
    marginTop: px(32)
  },
  itemRow: {
    flexDirection: "row",
    marginTop: px(48),
    // paddingBottom: px(24)
  },
  titleItem: {
    flex: 1,
    marginLeft: px(32)
  },
  rowTitleView: {
    height: px(64),
    flexDirection: "row",
    alignItems: "center"
  },
  rowTitle: {
    fontSize: px(32),
    marginLeft: px(32)
  },
  tagContainer: {
    flex: 1
  },
  tag: {
    backgroundColor: "#FF7733",
    width: px(56),
    height: px(32),
    borderRadius: px(6),
    marginLeft: px(16),
    alignItems: "center",
    justifyContent: "center"
  },
  tagTitle: {
    fontSize: px(20),
    color: "#fff"
  },
  selectButton: {
    width: px(32),
    height: px(32),
    marginRight: px(32)
  },
  selectBgImage: {
    height: px(32),
    width: px(32)
  },
  foot: {
    alignItems: "center",
    paddingTop: px(24),
    paddingBottom: px(32)
  },
  footText: {
    color: '#fff',
    width: px(686),
    marginBottom: px(32),
    opacity: 0.6
  }
});

export default CalculateResult;