import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  DeviceEventEmitter,
  WebView
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-navigation'
import {
  NavHeader,
  BlueButton,
  SimpleItem,
  LineView,
  ExpandItem,
  SelectButton,
  GenderButton,
  SpinnerLoadView,
  TabButton
} from "../../components";
import { px, ToastUtil } from "../../utils";
import { ActionTypes } from "../../constants";
import Modal from 'react-native-modalbox'
import { connect } from 'react-redux';
import { E } from '../../config'

const blood = ["μmoI/L", 'mg/dL'];
const targetRange = ["10-15 mg/L", "15-20 mg/L", "自定义"];
const targetRangeSelect = [[10, 15], [15, 20]]
const mic = ["1mg/L", "0.5mg/L", "2mg/L", "自定义"];
const micSelect = [1, 0.5, 2]
const rate = ["500 mg/h", "750 mg/h", "1000 mg/h", '自定义'];
const rateSelect = [500, 750, 1000]
const titles = ['初始值记录', '调整值记录', '初始浓度记录', '调整浓度记录']
const tillesCal = ['初试计算', '调整计算','初始浓度', '调整浓度']

class CalculatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectTab: 0,
      age: null,
      isMan: true,
      height: null,
      weight: null,
      target: null,
      serum: null,
      cMax: null,
      cMin: null,
      mic: null,
      rate: null,
      bloodIndex: 0,
      targetIndex: 0,
      targetRangeIndex: 0,
      micIndex: 0,
      rateIndex: 0,
      // 调整剂量
      dose: null, // 剂量
      dosingInterval: null, // 给药间隔
      infusionTime: null, // 输注时间
      valley: null, // 测定谷浓度
      CminLow: null,
      CminUpper: null,

      inputDose: null, // 浓度 计量
      inputDosingInterval: null, // 浓度 给药间隔
      inputInfusionTime: null, // 浓度 输注时间
    };
  }

  componentDidMount() {
    const { calculateType = 0 } = this.props.navigation.state.params || {};
    this.setState({
      selectTab: calculateType * 2
    })
  }

  render() {
    const { calculateType = 0 } = this.props.navigation.state.params || {};
    let title= "初始值记录"
    let buttonTitle = "记录"
    if (E.IS_IOS) {
      // 记录
      title = titles[this.state.selectTab]
    } else {
      // 计算
      title = tillesCal[this.state.selectTab]
      buttonTitle = "计算"
    }
    return (
      <SafeAreaView style={styles.container}>
        <NavHeader
          title={title}
          showBackButton={true}
          navigation={this.props.navigation}
        />
        {this.renderSeparate(buttonTitle)}
      </SafeAreaView>
    );
  }

  renderSeparate(buttonTitle) {
    const { calculateType = 0 } = this.props.navigation.state.params || {};
    console.log('renderSeparate', calculateType)
    // if (E.IS_IOS) {
    //   return <WebView
    //     ref='webview'
    //     onLoadEnd={() => {
    //       console.log('load end', this.refs.webview, global.SessionID, global.globalServer)
    //       this.refs.webview.postMessage(`${calculateType};${global.SessionID};${global.globalServer}`)
    //     }}
    //     javaScriptEnabled={true}
    //     style={{ flex: 1, width: px(730) }} 
    //     source={{ uri: 'http://localhost:3100/todo/index.html'}} />
    // }

    return (
      <View style={{ flex: 1 }}>
        {this.renderTabs()}
        {this.renderModalTarget()}
        {this.renderModalMic()}
        {this.renderModalRate()}
        {this.contentView()}
        <View style={styles.footer}>
          <BlueButton
            onPress={() => {
              this.setState({
                age: null,
                isMan: true,
                height: null,
                weight: null,
                target: null,
                serum: null,
                bloodIndex: 0,
                targetIndex: 0,
                targetRangeIndex: 0,
                micIndex: 0,
                rateIndex: 0,
                dose: null, // 剂量
                dosingInterval: null, // 给药间隔
                infusionTime: null, // 输注时间
                valley: null, // 测定谷浓度
                rate: null,
                mic: null,
                cMax: null,
                cMin: null,
                CminLow: null,
                CminUpper: null,
              })
            }}
            title="重置" backgroundStyle={styles.blueButton} />
          <BlueButton
            onPress={() => {
              this.calculate()
              // this.props.navigation.navigate("CalculateResult");
            }}
            title={buttonTitle}
            backgroundStyle={styles.blueButton}
          />
        </View>
      </View>
      
    )
  }

  renderTabs() {
    const { calculateType = 0 } = this.props.navigation.state.params || {};
    if (calculateType == 0) {
      return (
        <View style={{ height: px(92), flexDirection: 'row' }}>
          <TabButton title="初始剂量" index={0} selectIndex={this.state.selectTab} changeSelectIndex={this.changeTab.bind(this)} />
          <TabButton title="调整剂量" index={1} selectIndex={this.state.selectTab} changeSelectIndex={this.changeTab.bind(this)} />
        </View>
      )
    } else {
      return (
        <View style={{ height: px(92), flexDirection: 'row' }}>
          <TabButton title="初始浓度" index={2} selectIndex={this.state.selectTab} changeSelectIndex={this.changeTab.bind(this)} />
          <TabButton title="调整浓度" index={3} selectIndex={this.state.selectTab} changeSelectIndex={this.changeTab.bind(this)} />
        </View>
      )
    }
  }

  contentView() {
    switch(this.state.selectTab) {
      case 0:
        return this._renderBeginCalculate()
      case 1:
        return this._renderAdjustCalculate()
      case 2:
        return this._renderBeginDose()
      case 3:
        return this._renderAdjustDose()
    }
  }

  _renderBeginCalculate() {
    return (
        <ScrollView style={styles.content}>
          <View style={{ marginTop: px(32) }}>
            <Text style={{ fontSize: px(36), color: "#FFF" }}>基础参数</Text>
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: px(8),
                marginTop: px(32)
              }}
            >
              <SimpleItem
                title="年龄"
                rightView={
                  <View style={styles.item}>
                    <TextInput
                      keyboardType="number-pad"
                      value={this.state.age}
                      onChangeText={this.changeAge.bind(this)}
                      placeholder="请输入"
                      style={styles.itemInput}
                    />
                    <Text style={styles.itemRightTitle}>岁</Text>
                  </View>
                }
              />
              <LineView />
              <SimpleItem
                title="性别"
                rightView={
                  <View style={{ height: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
                    <GenderButton
                      changeGender={this.changeGender.bind(this)}
                      isMan={this.state.isMan}
                      />
                  </View>
                }
              />
              <LineView />
              <SimpleItem
                title="身高"
                rightView={
                  <View style={styles.item}>
                    <TextInput
                      keyboardType="number-pad"
                      value={this.state.height}
                      onChangeText={this.changeHeight.bind(this)}
                      placeholder="请输入"
                      style={styles.itemInput}
                    />
                    <Text style={styles.itemRightTitle}>cm</Text>
                  </View>
                }
              />
              <LineView />
              <SimpleItem
                title="体重"
                rightView={
                  <View style={styles.item}>
                    <TextInput
                      keyboardType="numeric"
                      value={this.state.weight}
                      placeholder="请输入"
                      onChangeText={this.changeWeight.bind(this)}
                      style={styles.itemInput}
                    />
                    <Text style={styles.itemRightTitle}>kg</Text>
                  </View>
                }
              />
              <LineView />
              <ExpandItem
                title="血肌酐"
                content={
                  <View
                    style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: 'center' }}
                  >
                    <TextInput
                      keyboardType="numeric"
                      onChangeText={this.changeSerum.bind(this)}
                      value={this.state.serum}
                      placeholder="请输入"
                      style={styles.itemInput}
                    />
                    <Text style={styles.itemRightTitle}>
                      {blood[this.state.bloodIndex]}
                    </Text>
                  </View>
                }
                expandView={
                  <View
                    style={{
                      height: "100%",
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <SelectButton
                      style={{ marginLeft: px(32) }}
                      index={0}
                      selectIndex={this.state.bloodIndex}
                      changeSelectIndex={this.changeSelectIndex.bind(this)}
                      title="μmoI/L"
                    />
                    <SelectButton
                      style={{ marginLeft: px(32) }}
                      index={1}
                      selectIndex={this.state.bloodIndex}
                      changeSelectIndex={this.changeSelectIndex.bind(this)}
                      title="mg/dL"
                    />
                  </View>
                }
                expandStyle={{ width: "100%" }}
              />
            </View>
          </View>
          {this.preSetView()}
        </ScrollView>
      );
  }

  _renderAdjustCalculate() {
    return (
      <ScrollView style={styles.content}>
        <View style={{ marginTop: px(32) }}>
          <Text style={{ fontSize: px(36), color: "#FFF" }}>
            当前用药及TDM情况
            </Text>
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: px(8),
              marginTop: px(32)
            }}
          >
            <SimpleItem
              title="剂量"
              value={this.state.dose}
              rightView={
                <View style={styles.item}>
                  <TextInput
                    placeholder="请输入"
                    keyboardType="numeric"
                    style={styles.itemInput}
                    value={this.state.dose}
                    onChangeText={this.changeDose.bind(this)}
                  />
                  <Text style={styles.itemRightTitle}>mg</Text>
                </View>
              }
            />
            <LineView />
            <SimpleItem
              title="给药间隔"
              value={this.state.dosingInterval}
              rightView={
                <View style={styles.item}>
                  <TextInput
                    placeholder="请输入"
                    keyboardType="numeric"
                    style={styles.itemInput}
                    value={this.state.dosingInterval}
                    onChangeText={this.changeDosingInterval.bind(this)}
                  />
                  <Text style={styles.itemRightTitle}>hrs</Text>
                </View>
              }
            />
            <LineView />
            <SimpleItem
              title="输注时间"
              value={this.state.infusionTime}
              rightView={
                <View style={styles.item}>
                  <TextInput
                    placeholder="请输入"
                    keyboardType="numeric"
                    style={styles.itemInput}
                    value={this.state.infusionTime}
                    onChangeText={this.changeInfusionTime.bind(this)} />
                  <Text style={styles.itemRightTitle}>hrs</Text>
                </View>
              }
            />
            <LineView />
            <SimpleItem
              title="测定谷浓度"
              value={this.state.valley}
              rightView={
                <View style={styles.item}>
                  <TextInput
                    placeholder="请输入"
                    keyboardType="numeric"
                    style={styles.itemInput}
                    value={this.state.valley}
                    onChangeText={this.changeValley.bind(this)} />
                  <Text style={styles.itemRightTitle}>mg/L</Text>
                </View>
              }
            />
          </View>
        </View>
        {this.preSetView()}
      </ScrollView>
    );
  }

  _renderBeginDose() {
    return (
      <ScrollView style={styles.content}>
        <KeyboardAwareScrollView>
        <View style={{ marginTop: px(32) }}>
          <Text style={{ fontSize: px(36), color: "#FFF" }}>基础参数</Text>
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: px(8),
              marginTop: px(32)
            }}
          >
            <SimpleItem
              title="年龄"
              rightView={
                <View style={styles.item}>
                  <TextInput
                    keyboardType="number-pad"
                    value={this.state.age}
                    onChangeText={this.changeAge.bind(this)}
                    placeholder="请输入"
                    style={styles.itemInput}
                  />
                  <Text style={styles.itemRightTitle}>岁</Text>
                </View>
              }
            />
            <LineView />
            <SimpleItem
              title="性别"
              rightView={
                <View style={{ height: '100%', justifyContent: 'center', alignItems: 'flex-end' }}>
                  <GenderButton
                    changeGender={this.changeGender.bind(this)}
                    isMan={this.state.isMan}
                  />
                </View>
              }
            />
            <LineView />
            <SimpleItem
              title="身高"
              rightView={
                <View style={styles.item}>
                  <TextInput
                    keyboardType="number-pad"
                    value={this.state.height}
                    onChangeText={this.changeHeight.bind(this)}
                    placeholder="请输入"
                    style={styles.itemInput}
                  />
                  <Text style={styles.itemRightTitle}>cm</Text>
                </View>
              }
            />
            <LineView />
            <SimpleItem
              title="体重"
              rightView={
                <View style={styles.item}>
                  <TextInput
                    keyboardType="numeric"
                    value={this.state.weight}
                    placeholder="请输入"
                    onChangeText={this.changeWeight.bind(this)}
                    style={styles.itemInput}
                  />
                  <Text style={styles.itemRightTitle}>kg</Text>
                </View>
              }
            />
            <LineView />
            <ExpandItem
              title="血肌酐"
              content={
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: 'center' }}
                >
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={this.changeSerum.bind(this)}
                    value={this.state.serum}
                    placeholder="请输入"
                    style={styles.itemInput}
                  />
                  <Text style={styles.itemRightTitle}>
                    {blood[this.state.bloodIndex]}
                  </Text>
                </View>
              }
              expandView={
                <View
                  style={{
                    height: "100%",
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <SelectButton
                    style={{ marginLeft: px(32) }}
                    index={0}
                    selectIndex={this.state.bloodIndex}
                    changeSelectIndex={this.changeSelectIndex.bind(this)}
                    title="μmoI/L"
                  />
                  <SelectButton
                    style={{ marginLeft: px(32) }}
                    index={1}
                    selectIndex={this.state.bloodIndex}
                    changeSelectIndex={this.changeSelectIndex.bind(this)}
                    title="mg/dL"
                  />
                </View>
              }
              expandStyle={{ width: "100%" }}
            />
          </View>
        </View>
        {this.preSetView()}
        </KeyboardAwareScrollView>
      </ScrollView>
    );
  }

  _renderAdjustDose() {
    return (
      <ScrollView style={styles.content}>
        <KeyboardAwareScrollView>
        <View style={{ marginTop: px(32) }}>
          <Text style={{ fontSize: px(36), color: "#FFF" }}>
            当前用药及TDM情况
            </Text>
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: px(8),
              marginTop: px(32)
            }}
          >
            <SimpleItem
              title="剂量"
              value={this.state.dose}
              rightView={
                <View style={styles.item}>
                  <TextInput
                    placeholder="请输入"
                    keyboardType="numeric"
                    style={styles.itemInput}
                    value={this.state.dose}
                    onChangeText={this.changeDose.bind(this)}
                  />
                  <Text style={styles.itemRightTitle}>mg</Text>
                </View>
              }
            />
            <LineView />
            <SimpleItem
              title="给药间隔"
              value={this.state.dosingInterval}
              rightView={
                <View style={styles.item}>
                  <TextInput
                    placeholder="请输入"
                    keyboardType="numeric"
                    style={styles.itemInput}
                    value={this.state.dosingInterval}
                    onChangeText={this.changeDosingInterval.bind(this)}
                  />
                  <Text style={styles.itemRightTitle}>hrs</Text>
                </View>
              }
            />
            <LineView />
            <SimpleItem
              title="输注时间"
              value={this.state.infusionTime}
              rightView={
                <View style={styles.item}>
                  <TextInput
                    placeholder="请输入"
                    keyboardType="numeric"
                    style={styles.itemInput}
                    value={this.state.infusionTime}
                    onChangeText={this.changeInfusionTime.bind(this)} />
                  <Text style={styles.itemRightTitle}>hrs</Text>
                </View>
              }
            />
            <LineView />
            <SimpleItem
              title="测定谷浓度"
              value={this.state.valley}
              rightView={
                <View style={styles.item}>
                  <TextInput
                    placeholder="请输入"
                    keyboardType="numeric"
                    style={styles.itemInput}
                    value={this.state.valley}
                    onChangeText={this.changeValley.bind(this)} />
                  <Text style={styles.itemRightTitle}>mg/L</Text>
                </View>
              }
            />
          </View>
        </View>
        {this.preSetView()}
        </KeyboardAwareScrollView>
      </ScrollView>
    );
  }

  preSetView() {
    const { calculateType = 0 } = this.props.navigation.state.params || {};
    if (calculateType == 0) {
      return this.calculatePreSetView()
    } else {
      return this.dosePreSetView()
    }
  }

  calculatePreSetView() {
    return <View style={{ marginTop: px(48) }}>
        <Text style={{ fontSize: px(32), color: "#FFF" }}>
          期望方案设置
        </Text>
        <View style={{ backgroundColor: "#fff", borderRadius: px(8), marginTop: px(32) }}>
          <ExpandItem title="目标谷浓度范围" content={<View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={{ marginLeft: px(16), color: '#333' }}>
                  {this.state.targetRangeIndex == 2 ? `${this.state.cMin}-${this.state.cMax} mg/L`: targetRange[this.state.targetRangeIndex]}
                </Text>
              </View>} expandView={<View style={{ height: "100%", width: "100%", flexDirection: "row", alignItems: "center" }}>
                <SelectButton style={{ marginLeft: px(32) }} changeSelectIndex={this.changeTargeRangeIndex.bind(this)} selectIndex={this.state.targetRangeIndex} index={0} title="10-15 mg/L" />
                <SelectButton style={{ marginLeft: px(24) }} changeSelectIndex={this.changeTargeRangeIndex.bind(this)} selectIndex={this.state.targetRangeIndex} index={1} title="15-20 mg/L" />
                <SelectButton style={{ marginLeft: px(24) }} changeSelectIndex={this.changeTargeRangeIndex.bind(this)} selectIndex={this.state.targetRangeIndex} index={2} title="自定义" />
              </View>} expandStyle={{ width: "100%" }} />
          <LineView />
          <ExpandItem title="MIC" content={<View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Text style={{ marginLeft: px(16), color: '#333' }}>
                {this.state.micIndex == 3 ? `${this.state.mic} mg/L` : mic[this.state.micIndex]}
                </Text>
              </View>} expandView={
                <View style={{ height: "100%", width: "100%", flexDirection: "column", alignItems: "center" }}>
                  <View style={{ flexDirection: "row", marginTop: px(32), alignItems: "center", width: "100%" }}>
                    <SelectButton index={0} selectIndex={this.state.micIndex} changeSelectIndex={this.changeMicIndex.bind(this)} style={{ marginLeft: px(32) }} title="经验用药或1mg/L" />
                    <SelectButton index={1} selectIndex={this.state.micIndex} changeSelectIndex={this.changeMicIndex.bind(this)} style={{ marginLeft: px(24) }} title="0.5mg/L" />
                    <SelectButton index={2} selectIndex={this.state.micIndex} changeSelectIndex={this.changeMicIndex.bind(this)} style={{ marginLeft: px(24) }} title="2mg/L" />
                  </View>
                  <View style={{ flexDirection: "row", marginTop: px(24), alignItems: "center", width: "100%" }}>
                    <SelectButton index={3} selectIndex={this.state.micIndex} changeSelectIndex={this.changeMicIndex.bind(this)} style={{ marginLeft: px(32) }} title="自定义" />
                  </View>
                </View>
          } expandStyle={{ width: "100%", height: px(216) }} />
          <LineView />
          <ExpandItem title="输注速率" content={<View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <Text style={{ marginLeft: px(16), color: '#333' }}>
            {this.state.rateIndex == 3 ? `${this.state.rate} mg/h` : rate[this.state.rateIndex]}
                </Text>
              </View>} expandView={<View style={{ height: "100%", width: "100%", flexDirection: "column", alignItems: "center" }}>
                <View style={{ flexDirection: "row", marginTop: px(32) , alignItems: "center", width: "100%" }}>
                  <SelectButton index={0} selectIndex={this.state.rateIndex} changeSelectIndex={this.changeRateIndex.bind(this)} style={{ marginLeft: px(32) }} title="500 mg/h" />
                  <SelectButton index={1} selectIndex={this.state.rateIndex} changeSelectIndex={this.changeRateIndex.bind(this)} style={{ marginLeft: px(24) }} title="750 mg/h" />
                  <SelectButton index={2} selectIndex={this.state.rateIndex} changeSelectIndex={this.changeRateIndex.bind(this)} style={{ marginLeft: px(24) }} title="1000 mg/h" />
                </View>
                <View style={{ flexDirection: "row", marginTop: px(24), alignItems: "center", width: "100%" }}>
                  <SelectButton index={3} selectIndex={this.state.rateIndex} changeSelectIndex={this.changeRateIndex.bind(this)} style={{ marginLeft: px(32) }} title="自定义" />
                </View>
              </View>} expandStyle={{ width: "100%", height: px(216) }} />
        </View>
      </View>;
  }

  dosePreSetView() {
    // inputDose: null, // 浓度 计量
    //   inputDosingInterval: null, // 浓度 给药间隔
    //     inputInfusionTime: null, // 浓度 输注时间
    return <View style={{ marginTop: px(48) }}>
      <Text style={{ fontSize: px(32), color: "#FFF" }}>
        期望方案设置
        </Text>
      <View style={{ backgroundColor: "#fff", borderRadius: px(8), marginTop: px(32) }}>
        <ExpandItem title="MIC" content={<View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Text style={{ marginLeft: px(16), color: '#333' }}>
            {this.state.micIndex == 3 ? `${this.state.mic} mg/L` : mic[this.state.micIndex]}
          </Text>
        </View>} expandView={
          <View style={{ height: "100%", width: "100%", flexDirection: "column", alignItems: "center" }}>
            <View style={{ flexDirection: "row", marginTop: px(32), alignItems: "center", width: "100%" }}>
              <SelectButton index={0} selectIndex={this.state.micIndex} changeSelectIndex={this.changeMicIndex.bind(this)} style={{ marginLeft: px(32) }} title="经验用药或1mg/L" />
              <SelectButton index={1} selectIndex={this.state.micIndex} changeSelectIndex={this.changeMicIndex.bind(this)} style={{ marginLeft: px(24) }} title="0.5mg/L" />
              <SelectButton index={2} selectIndex={this.state.micIndex} changeSelectIndex={this.changeMicIndex.bind(this)} style={{ marginLeft: px(24) }} title="2mg/L" />
            </View>
            <View style={{ flexDirection: "row", marginTop: px(24), alignItems: "center", width: "100%" }}>
              <SelectButton index={3} selectIndex={this.state.micIndex} changeSelectIndex={this.changeMicIndex.bind(this)} style={{ marginLeft: px(32) }} title="自定义" />
            </View>
          </View>
        } expandStyle={{ width: "100%", height: px(216) }} />
        <LineView />
        <SimpleItem
          title="剂量"
          value={this.state.dose}
          rightView={
            <View style={styles.item}>
              <TextInput
                placeholder="请输入"
                keyboardType="numeric"
                style={styles.itemInput}
                value={this.state.inputDose}
                onChangeText={this.changeInputDose.bind(this)}
              />
              <Text style={styles.itemRightTitle}>mg</Text>
            </View>
          }
        />
        <LineView />
        <SimpleItem
          title="给药间隔"
          value={this.state.dose}
          rightView={
            <View style={styles.item}>
              <TextInput
                placeholder="请输入"
                keyboardType="numeric"
                style={styles.itemInput}
                value={this.state.inputDosingInterval}
                onChangeText={this.changeIputDosingInterval.bind(this)}
              />
              <Text style={styles.itemRightTitle}>hrs</Text>
            </View>
          }
        />
        <LineView />
        <SimpleItem
          title="输注时间"
          value={this.state.dose}
          rightView={
            <View style={styles.item}>
              <TextInput
                placeholder="请输入"
                keyboardType="numeric"
                style={styles.itemInput}
                value={this.state.inputInfusionTime}
                onChangeText={this.changeInputInfusionTime.bind(this)}
              />
              <Text style={styles.itemRightTitle}>hrs</Text>
            </View>
          }
        />
        <LineView />
      </View>
    </View>;
  }

  renderModalTarget() {
    return (
      <Modal
        ref={'modal1'}
        style={{
          width: px(565),
          height: px(356),
          backgroundColor: '#fff',
          borderRadius: px(24)
        }}>
        <Text style={{ fontSize: px(36), textAlign: 'center', marginTop: px(48) }}>自定义</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: px(48) }}>
          <TextInput
            keyboardType="numeric"
            placeholder="请输入"
            value={this.state.cMin}
            onChangeText={(val) => {
              this.setState({
                cMin: val
              })
            }}
            style={{ backgroundColor: '#f5f5f5', width: px(172), height: px(76), borderRadius: px(8) }} />
          <View style={{ width: px(32), height: px(2), backgroundColor: '#ccc', marginLeft: px(16), marginRight: px(16)}}/>
          <TextInput
            placeholder="请输入"
            keyboardType="numeric"
            value={this.state.cMax}
            onChangeText={(val) => {
              this.setState({
                cMax: val
              })
            }}
            style={{ backgroundColor: '#f5f5f5', width: px(172), height: px(76), borderRadius: px(8) }} />
          <Text style={{ color: '#333', fontSize: px(28), marginLeft: px(15) }}>mg/L</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <TouchableOpacity
          onPress={() => {
            if (this.state.cMin != null && this.state.cMin.trim().length > 0 && this.state.cMax != null && this.state.cMax.trim().length > 0) {
              if (parseInt(this.state.cMax) > parseInt(this.state.cMin)) {
                this.setState({
                  targetRangeIndex: 2
                })
              } else {
                ToastUtil.fail('浓度范围参数输入错误，请由低到高')
                return;
              }
            }
            this.refs.modal1.close()
          }}
          activeOpacity={0.7}
          style={{ height: px(100), width: '100%', alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: px(24), borderBottomRightRadius: px(24), borderTopColor: '#EBEBEB', borderTopWidth: px(1) }}>
          <Text>确定</Text>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderModalMic() {
    return (
      <Modal
        ref={'modal2'}
        style={{
          width: px(565),
          height: px(356),
          backgroundColor: '#fff',
          borderRadius: px(24)
        }}>
        <Text style={{ fontSize: px(36), textAlign: 'center', marginTop: px(48) }}>自定义</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: px(48) }}>
          <TextInput
            keyboardType="numeric"
            value={this.state.mic}
            onChangeText={(val) => {
              this.setState({
                mic: val
              })
            }}
            style={{ backgroundColor: '#f5f5f5', width: px(410), height: px(76), borderRadius: px(8) }} />
          <Text style={{ color: '#333', fontSize: px(28), marginLeft: px(15) }}>mg/L</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <TouchableOpacity
          onPress={() => {
            if (this.state.mic != null && this.state.mic.trim().length > 0) {
              this.setState({
                micIndex: 2
              })
            }
            this.refs.modal2.close()
          }}
          activeOpacity={0.7}
          style={{ height: px(100), width: '100%', alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: px(24), borderBottomRightRadius: px(24), borderTopColor: '#EBEBEB', borderTopWidth: px(1) }}>
          <Text>确定</Text>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderModalRate() {
    return (
      <Modal
        ref={'modal3'}
        style={{
          width: px(565),
          height: px(356),
          backgroundColor: '#fff',
          borderRadius: px(24)
        }}>
        <Text style={{ fontSize: px(36), textAlign: 'center', marginTop: px(48) }}>自定义</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: px(48) }}>
          <TextInput
            keyboardType="numeric"
            value={this.state.rate}
            onChangeText={(val) => {
              this.setState({
                rate: val
              })
            }}
            style={{ backgroundColor: '#f5f5f5', width: px(410), height: px(76), borderRadius: px(8) }} />
          <Text style={{ color: '#333', fontSize: px(28), marginLeft: px(15) }}>mg/h</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <TouchableOpacity
          onPress={() => {
            if (this.state.rate != null && this.state.rate.trim().length > 0) {
              this.setState({
                rateIndex: 3
              })
            }
            this.refs.modal3.close()
          }}
          activeOpacity={0.7}
          style={{ height: px(100), width: '100%', alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: px(24), borderBottomRightRadius: px(24), borderTopColor: '#EBEBEB', borderTopWidth: px(1) }}>
          <Text>确定</Text>
        </TouchableOpacity>
      </Modal>
    )
  }

  changeTab(index) {
    this.setState({
      selectTab: index
    })
    
  }

  changeSelectIndex(index) {
    this.setState({
      bloodIndex: index
    });
  }

  changeTargeRangeIndex(index) {
    if (index === 2) {
      // 自定义
      this.refs.modal1.open()
    } else {
      this.setState({
        targetRangeIndex: index
      });
    }
  }

  changeMicIndex(index) {
    if (index === 3) {
      // 自定义
      this.refs.modal2.open()
    } else {
      this.setState({
        micIndex: index
      });
    }
  }

  changeRateIndex(index) {
    if (index == 3) {
      this.refs.modal3.open()
    } else {
      this.setState({
        rateIndex: index
      })
    }
  }

  changeAge(val) {
    this.setState({
      age: val
    })
  }

  changeGender(val) {
    this.setState({
      isMan: val
    })
  }

  changeHeight(val) {
    this.setState({
      height: val
    })
  }

  changeWeight(val) {
    this.setState({
      weight: val
    })
  }

  changeSerum(val) {
    this.setState({
      serum: val
    })
  }

  changeTargetRange(val) {
    this.setState({
      targetRange: null
    })
  }

  changeMic(val) {
    this.setState({
      mic: val
    })
  }

  changeRate(val) {
    this.setState({
      rate: val
    })
  }

  changeDose(val) {
    this.setState({
      dose: val,
    })
  }

  changeDosingInterval(val) {
    this.setState({
      dosingInterval: val,
    })
  }

  changeInfusionTime(val) {
    this.setState({
      infusionTime: val
    })
  }

  changeValley(val) {
    this.setState({
      valley: val
    })
  }

  changeInputDose(val) {
    this.setState({
      inputDose: val,
    })
  }

  changeIputDosingInterval(val) {
    this.setState({
      inputDosingInterval: val
    })
  }

  changeInputInfusionTime(val) {
    this.setState({
      inputInfusionTime: val
    })
  }

  calculate() {
    if (!this.props.isLogin) {
      this.props.navigation.navigate('Login')
      return;
    }
    if (this.state.selectTab === 0) {
      if (this.state.age == null || !(parseInt(this.state.age) > 0 && parseInt(this.state.age) < 130)) {
        ToastUtil.fail('请输入正确的年龄')
        return;
      }

      if (this.state.height == null || !(parseInt(this.state.height) > 10 && parseInt(this.state.height) < 280)) {
        ToastUtil.fail('请输入正确的身高')
        return;
      }

      if (this.state.weight == null || !(parseInt(this.state.weight) > 0 && parseInt(this.state.weight) < 1000)) {
        ToastUtil.fail('请输入正确的体重')
        return;
      }

      if (this.state.serum == null) {
        ToastUtil.fail('请输入血肌酐数值')
        return;
      }
      // 获取数据
      const data = {
        Age: this.state.age,
        Weight: this.state.weight,
        Height: parseInt(this.state.height) / 100,
        Scr: this.state.serum,
        ScrUnit: this.state.bloodIndex + 1,
        Female: !this.state.isMan,
        MIC: this.state.micIndex == 2 ? this.state.mic : micSelect[this.state.micIndex],
        CminLow: this.state.targetRangeIndex == 2 ? this.state.cMin : targetRangeSelect[this.state.targetRangeIndex][0],
        CminUpper: this.state.targetRangeIndex == 2 ? this.state.cMax : targetRangeSelect[this.state.targetRangeIndex][1],
        Rate: this.state.rateIndex == 3 ? this.state.rate : rateSelect[this.state.rateIndex]
      }
      const callBack = this.calculateSuccess.bind(this)
      actionUtil(ActionTypes.BEGIN_CALCULATE_MEDICINE, { data, callBack })
      SpinnerLoadView.show()
    } else if (this.state.selectTab === 1) {
      if (this.state.dose == null || this.state.dosingInterval == null || this.state.infusionTime == null || this.state.valley == null) {
        ToastUtil.fail('请输入正确的值！')
        return;
      }
      // 获取数据
      const data = {
        Dose: this.state.dose,
        Tau: this.state.dosingInterval,
        ti: this.state.infusionTime,
        Cmin: this.state.valley,
        MIC: this.state.micIndex == 2 ? this.state.mic : micSelect[this.state.micIndex],
        CminLow: this.state.targetRangeIndex == 2 ? this.state.cMin : targetRangeSelect[this.state.targetRangeIndex][0],
        CminUpper: this.state.targetRangeIndex == 2 ? this.state.cMax : targetRangeSelect[this.state.targetRangeIndex][1],
        Rate: this.state.rateIndex == 3 ? this.state.rate : rateSelect[this.state.rateIndex]
      }
      const callBack = this.calculateSuccess.bind(this)
      actionUtil(ActionTypes.ADJUST_CALCULATE, { data, callBack })
      SpinnerLoadView.show()
    } else if (this.state.selectTab == 2) {
      if (this.state.age == null || this.state.weight == null ||
        this.state.serum == null || this.state.inputDose == null ||
        this.state.inputDosingInterval == null || this.state.inputInfusionTime == null) {
          ToastUtil.fail('请输入正确的值！')
          return;
        }
      const data = {
        Age: this.state.age,
        Weight: this.state.weight,
        Height: parseInt(this.state.height) / 100,
        Scr: this.state.serum,
        ScrUnit: this.state.bloodIndex + 1,
        Female: !this.state.isMan,
        MIC: this.state.micIndex == 2 ? this.state.mic : micSelect[this.state.micIndex],
        CDose: this.state.inputDose,
        CTau: this.state.inputDosingInterval,
        Cti: this.state.inputInfusionTime
      }
      const callBack = this.predictDoseSuccess.bind(this)
      actionUtil(ActionTypes.INIT_CONCENTRATION_CALC, { data, callBack })
      SpinnerLoadView.show()
    } else if (this.state.selectTab === 3) {
      // "MIC": 1, MIC
      // "CDose": 1000, 本次调整剂量
      // "CTau": 8, 本次调整给药间隔
      // "Cti": 1.5 本地调整输注时间
      if (this.state.dose == null || this.state.dosingInterval == null ||
        this.state.infusionTime == null || this.state.valley == null ||
        this.state.inputDose == null || this.state.inputDosingInterval == null || this.state.inputInfusionTime == null) {
          ToastUtil.fail('请输入正确的值！')
          return;
        }
      const data = {
        Dose: this.state.dose,
        Tau: this.state.dosingInterval,
        ti: this.state.infusionTime,
        Cmin: this.state.valley,
        MIC: this.state.micIndex == 2 ? this.state.mic : micSelect[this.state.micIndex],
        CDose: this.state.inputDose,
        CTau: this.state.inputDosingInterval,
        Cti: this.state.inputInfusionTime
      }
      const callBack = this.adjustPredictDoseSuccess.bind(this)
      actionUtil(ActionTypes.PREDICT_CONCENTRATION_CALC, { data, callBack })
      SpinnerLoadView.show()
    }
  }

  calculateSuccess(data, error) {
    SpinnerLoadView.hide()
    if (data) {
      if (E.IS_IOS) {
        const { Solutions } = data;
        if (Solutions.length > 0) {
          const { SolutionId } = Solutions[0]
          const postData = {
            solutionId: SolutionId
          }
          const callBack = this.saveSolutionSuccess.bind(this)
          actionUtil(ActionTypes.SAVE_SOLUTION_ID, { data: postData, callBack })
          SpinnerLoadView.show()
        } else {
          ToastUtil.fail('请求失败')
        }
      } else {
        this.props.navigation.navigate('CalculateResult', { data, type: this.state.selectTab })
      }
    }
  }

  predictDoseSuccess(data, error) {
    SpinnerLoadView.hide()
    if (data) {
      if (E.IS_IOS) {
        console.log('predictDoseSuccess', data)
        const { SolutionId } = data
        const postData = {
          solutionId: SolutionId
        }
        const callBack = this.saveSolutionSuccess.bind(this)
        actionUtil(ActionTypes.SAVE_SOLUTION_ID, { data: postData, callBack })
        SpinnerLoadView.show()
      } else {
        this.props.navigation.navigate('CalculateResult', { data, type: this.state.selectTab })
      }
    }
  }

  adjustPredictDoseSuccess(data, error) {
    SpinnerLoadView.hide()
    if (data) {
      if (E.IS_IOS) {
        const { SolutionId } = data
        const postData = {
          solutionId: SolutionId
        }
        const callBack = this.saveSolutionSuccess.bind(this)
        actionUtil(ActionTypes.SAVE_SOLUTION_ID, { data: postData, callBack })
        SpinnerLoadView.show()
      } else {
        this.props.navigation.navigate('CalculateResult', { data, type: this.state.selectTab })
      }
    } else {
      ToastUtil.fail('请求失败')
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
    width: '100%',
    backgroundColor: "#123D70",
    alignItems: "center"
  },
  content: {
    flex: 1,
    paddingLeft: px(32),
    paddingRight: px(32),
    marginBottom: px(32)
  },

  footer: {
    flexDirection: "row",
    paddingBottom: px(20)
  },
  blueButton: {
    height: px(100),
    width: px(327)
  },
  item: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  itemInput: {
    flex: 1,
    textAlign: "right"
  },
  itemRightTitle: {
    marginLeft: px(10),
    fontSize: px(32),
    color: '#333'
  }
});

export default connect(state => ({
  isLogin: state.login.isLogin
})
)(CalculatePage)